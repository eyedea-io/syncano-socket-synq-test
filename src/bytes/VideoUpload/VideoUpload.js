/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const DropZone = require('react-dropzone');

const cn = require('classnames/bind').bind(styles);

const VideoUpload = ({
  services: {
  app: { sendFile }
}
}) => {
  return (
    <div className={cn('VideoUpload')}>
      <DropZone onDrop={sendFile} className={cn('VideoUpload__dropzone')}>
        <div>UPLOAD VIDEO</div>
      </DropZone>
    </div>
  );
};

VideoUpload.propTypes = {
  services: PropTypes.object
};

export default connect(VideoUpload);
