import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';
import { Spinner, VideoControls } from 'bits';

const cn = require('classnames/bind').bind(styles);

const VideoPlayer = ({
videoBlob,
  store: {
    app: { isProcessing, isUploading }
  },
  services: {
    app: { setVideoBlob }
  }
  }) => {
  const handleClear = () => {
    setVideoBlob('');
  };
  return (
    <div
      className={cn('VideoPlayer')}
      >
      <div className={cn('VideoPlayer__clear', 'material-icons')} onClick={handleClear}>
        clear
      </div>
      <video
        autoPlay
        name="media"
        id="VPlayer"
        >
        <source
          src={videoBlob}
          type="video/webm"
          />
      </video>
      <VideoControls/>
      {isProcessing ? <Spinner message={'Processing Video...'}/> : null}
      {isUploading ? <Spinner message={'Uploading Video...'}/> : null}
    </div>
  );
};

VideoPlayer.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object,
  videoBlob: PropTypes.string
};

export default connect(VideoPlayer);
