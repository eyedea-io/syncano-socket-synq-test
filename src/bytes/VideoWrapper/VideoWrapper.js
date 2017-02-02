/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { VideoRecorder, VideoPlayer } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoWrapper = ({
  store: {
    app: {
      videoSrc, videoBlob
    }
  }
}
) => {
  return (
    <div className={cn('VideoWrapper')}>
      <VideoRecorder/>
      <VideoPlayer videoSrc={videoSrc} videoBlob={videoBlob}/>
    </div>
  );
};

VideoWrapper.propTypes = {
  store: PropTypes.object
};

export default connect(VideoWrapper);
