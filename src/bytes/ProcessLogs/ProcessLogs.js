import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';
import { Spinner } from 'bits';

const cn = require('classnames/bind').bind(styles);

const ProcessLogs = ({
videoBlob,
  store: {
    app: { isProcessing, isUploading, status }
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
      className={cn('ProcessLogs')}
      >
      <div className={cn('ProcessLogs__clear', 'material-icons')} onClick={handleClear}>
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
      {status.length ? <Spinner message={status}/> : null}
      {isUploading ? <Spinner message={'Uploading Video...'}/> : null}
      {isProcessing ? <Spinner message={'Processing Video...'}/> : null}
    </div>
  );
};

ProcessLogs.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object,
  videoBlob: PropTypes.string
};

export default connect(ProcessLogs);
