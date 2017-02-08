/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const DropZone = require('react-dropzone');

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { setVideoBlob, setUploadState, setProcessingState, setStatus, setVideoUrl, setUploaded, setFinished, setInitiated, fetchVideos }
}
}) => {
  const uploadState = setUploadState;
  const processState = setProcessingState;
  const handleSend = files => {
    const token = window.localStorage.getItem('token');
    console.log('moj token: %c test', token, 'color: red; font-size: 24px;');
    console.log(token);
    uploadState(true);
    processState(false);
    setVideoBlob('');
    setStatus('');
    setVideoUrl('');
    setUploaded(false);
    setInitiated(false);
    setFinished(false);
    const file = files[0];
    const url = 'https://resonance-damp-2382.syncano.link/synq/upload/';
    fetch(url, {
      headers: {
        'X-USER-KEY': token
      },
      method: 'GET'
    }).then(data => {
      if (data.ok) {
        setInitiated(true);
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
            }).then(res => {
              setUploaded(true);
              if (res.ok) {
                fetch('https://resonance-damp-2382.syncano.link/synq/subscribe_channel/', {
                  headers: {
                    'X-USER-KEY': token
                  },
                  method: 'GET'
                })
                  .then(res => res.json())
                    .then(json => {
                      setFinished(true);
                      processState(false);
                      setStatus('Completed!');
                      setVideoUrl(json.payload.message);
                      setVideoBlob(json.payload.message);
                      fetchVideos();
                    });
              } else {
                throw new Error(`Response ${res.status}`);
              }
            }).catch(err => {
              if (err) {
                processState(false);
                setStatus(`Something went wrong: ${err}`);
                console.error(err);
              }
            });
          });
      } else {
        throw new Error(`Response ${data.status}`);
      }
    }).catch(err => {
      uploadState(false);
      setStatus(`Something went wrong: ${err}`);
      console.error(err);
    });
  };
  return (
    <div className={cn('VideoUpload')}>
      <DropZone onDrop={handleSend} className={cn('VideoUpload__dropzone')}>
        <div>UPLOAD VIDEO</div>
      </DropZone>
    </div>
  );
};

VideoUpload.propTypes = {
  services: PropTypes.object
};

export default connect(VideoUpload);
