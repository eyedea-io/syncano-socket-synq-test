/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import styles from './styles.css';
import { VideoPlayer, VideoRecorder, VideoUpload } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoWrapper = ({
  store: {
    app: {
     videoBlob, isLoggedIn
    }
  },
  services: {
    app: { fetchVideos }
  }
}
) => {
  if (isLoggedIn) {
    fetchVideos();
  }
  return (
    <div className={cn('VideoWrapper')}>
      <VideoRecorder>
        <VideoUpload/>
      </VideoRecorder>
      <VideoPlayer videoBlob={videoBlob}/>
    </div>
  );
};

VideoWrapper.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object
};

export default connect(VideoWrapper);
