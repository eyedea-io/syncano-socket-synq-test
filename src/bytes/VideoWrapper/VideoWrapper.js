/* eslint camelcase: ["error", {properties: "never"}] */
import React from 'react';
import styles from './styles.css';
import { VideoRecorder } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoUpload = (
) => {
  return (
    <div className={cn('VideoWrapper')}>
      <VideoRecorder/>
    </div>
  );
};

VideoUpload.propTypes = {
};

export default connect(VideoUpload);
