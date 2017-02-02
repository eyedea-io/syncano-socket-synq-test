import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoPlayer = ({
videoBlob
  }) => {
  return (
    <div
      className={cn('VideoPlayer')}
      >
      <video
        controls
        autoPlay
        name="media"
        >
        <source
          src={videoBlob}
          type="video/webm"
          />
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoBlob: PropTypes.string
};

export default connect(VideoPlayer);
