/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const DropZone = require('react-dropzone');

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { setVideoBlob, setUploadState, setProcessingState, setStatus, setVideoUrl }
}
}) => {
  const uploadState = setUploadState;
  const processState = setProcessingState;
  const handleSend = files => {
    uploadState(true);
    processState(false);
    setVideoBlob('');
    setStatus('');
    setVideoUrl('');
    const file = files[0];
    const url = 'https://resonance-damp-2382.syncano.link/synq/create/';
    fetch(url, {
      method: 'GET'
    }).then(data => {
      data.json()
        .then(data => {
          console.log(data, 'after create');
          const form = new FormData();
          const formObject = data.form;
          for (const key in formObject) {
            if (Object.prototype.hasOwnProperty.call(formObject, key)) {
              form.append(key, formObject[key]);
            }
          }
          form.append('file', file);
          uploadState(false);
          processState(true);
          fetch(data.url, {
            method: 'POST',
            body: form
          }).then(() => {
            fetch('https://resonance-damp-2382.syncano.link/synq/subscribe_channel/')
              .then(res => res.json())
                .then(json => {
                  processState(false);
                  console.log(json.payload.message);
                  setStatus('Completed!');
                  setVideoUrl(json.payload.message);
                  setVideoBlob(json.payload.message);
                });
          });
        });
    }).catch(err => {
      console.error(err);
    });
  };
  return (
    <div>
      <div className={cn('VideoUpload')}>
        <DropZone onDrop={handleSend} className={cn('VideoUpload__dropzone')}>
          <div>UPLOAD VIDEO</div>
        </DropZone>
      </div>
      {/* <button onClick={handleSnd}>SEND</button> */}
    </div>
  );
};

VideoUpload.propTypes = {
  services: PropTypes.object
};

export default connect(VideoUpload);
