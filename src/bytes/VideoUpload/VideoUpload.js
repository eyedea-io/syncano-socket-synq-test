/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { sendFile }
}
}) => {
  const send = e => {
    e.preventDefault();
    const vd = document.getElementById('vidfile');
    const file = vd.files[0];
    vd.value = ''; // reset file value
    sendFile(file);
  };
  return (
    <div className={cn('VideoUpload')}>
      <div className={cn('VideoUpload__dropzone')}>
        <div><input type="file" id="vidfile" onChange={send}/>UPLOAD VIDEO</div>
      </div>
    </div>
  );
};

VideoUpload.propTypes = {
  services: PropTypes.object
};

export default connect(VideoUpload);
