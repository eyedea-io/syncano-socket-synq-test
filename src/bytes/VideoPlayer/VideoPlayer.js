import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';
import { Spinner } from 'bits';
import { UrlContainer } from 'bytes';

const cn = require('classnames/bind').bind(styles);

const VideoPlayer = ({
videoBlob,
  store: {
    app: { isProcessing, isUploading, status, videoUrl }
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
        controls
        autoPlay
        name="media"
        id="VPlayer"
        >
        <source
          src={videoBlob}
          type="video/webm"
          />
      </video>
      {console.log(isUploading, isProcessing)}
      {/* <ProcessLogs upload={hasFinished} process={hasProcessed} finished={isFinished}/> */}
      {videoUrl.length ? <UrlContainer videoUrl={videoUrl}/> : null}
      {status.length ? <Spinner message={status}/> : null}
      {isUploading ? <Spinner message={'Uploading Video...'}/> : null}
      {isProcessing ? <Spinner message={'Processing Video...'}/> : null}
    </div>
  );
};

VideoPlayer.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object,
  videoBlob: PropTypes.string
};

export default connect(VideoPlayer);
