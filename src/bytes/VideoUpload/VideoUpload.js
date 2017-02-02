/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const DropZone = require('react-dropzone');

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { setVideoBlob }}
}) => {
  // const data = new FormData();
  const handleSend = files => {
    const file = files[0];
    setVideoBlob(file.preview);
    // console.log(fs);
    // console.log(file);
    // data.append('api_key', process.env.SYNQ_API_KEY);
    // data.append('file', file);
    // const url = 'https://api.synq.fm/v1/video/create';
    const url = 'https://brook-throbbing-6163.syncano.link/synq/create/';
    fetch(url, {
      method: 'GET'
    }).then(data => {
      data.json().then(data => {
        const form = new FormData();
        const formObject = data.form;
        console.log(form, formObject);
        for (const key in formObject) {
          if (Object.prototype.hasOwnProperty.call(formObject, key)) {
            form.append(key, formObject[key]);
          }
        }
        console.log(file);
        form.append('file', file);
        fetch(data.url, {
          method: 'POST',
          body: form
        }).then(data => {
          console.log(data);
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
    </div>
  );
};

VideoUpload.propTypes = {
  services: PropTypes.object
};

export default connect(VideoUpload);
