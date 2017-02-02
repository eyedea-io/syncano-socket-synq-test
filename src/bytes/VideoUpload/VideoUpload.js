/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const DropZone = require('react-dropzone');

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { setVideoBlob, setUploadState, setProcessingState }
}
}) => {
  // const data = new FormData();
  const uploadState = setUploadState;
  const processState = setProcessingState;
  const handleSend = files => {
    const file = files[0];
    // console.log(fs);
    // console.log(file);
    // data.append('api_key', process.env.SYNQ_API_KEY);
    // data.append('file', file);
    // const url = 'https://api.synq.fm/v1/video/create';
    setVideoBlob('');
    const url = 'https://brook-throbbing-6163.syncano.link/synq/create/';
    fetch(url, {
      method: 'GET'
    }).then(data => {
      data.json().then(data => {
        const form = new FormData();
        const formObject = data.form;
        for (const key in formObject) {
          if (Object.prototype.hasOwnProperty.call(formObject, key)) {
            form.append(key, formObject[key]);
          }
        }
        form.append('file', file);
        uploadState(true);
        fetch(data.url, {
          method: 'POST',
          body: form
        }).then(data => {
          processState(true);
          uploadState(false);
          console.log(data.json(), 'log from post');
          const url = 'https://resonance-damp-2382.syncano.link/synq/subscribe_channel/';
          const cancelPoll = setInterval(() => {
            console.log('FetchRevoked');
            fetch(url, {
              method: 'GET'
            }).then(data => {
              console.log(data.json());
              clearInterval(cancelPoll);
            });
          }, 10000);
          // TODO On upload
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };
  // const handleSnd = () => {
  //   const url = 'https://resonance-damp-2382.syncano.link/synq/subscribe_channel/';
  //   fetch(url, {
  //     headers: {
  //       'X-USER-KEY': 'ecf10bd5bdca44409126aa2ef57da7705abd568a'
  //     },
  //     method: 'GET'
  //   }).then(data => {
  //     data.json().then(data => {
  //       console.log(data);
  //     });
  //   });
  // };
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
