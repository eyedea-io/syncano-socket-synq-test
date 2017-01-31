import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoPlayer = ({
  videoSrc, videoBlob, width, height
  }) => {
  console.log('ts');
  return (
    <div>
      <div
        className={cn('VideoPlayer')}
        >
        <div className={cn('VideoPlayer__toggle', 'mb')}>
          <video
            autoPlay
            src={videoSrc}
            />
          <iframe
            src={videoBlob}
            allowFullScreen
            width={width}
            height={height}
            />
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoSrc: PropTypes.object,
  videoBlob: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default connect(VideoPlayer);
