import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoPlayer = videoSrc => {
  console.log('ts');
  return (
    <div>
      <div className={cn('VideoPlayer')}>
        <div className={cn('VideoPlayer__toggle', 'mb')}>
          <iframe
            allowFullScreen
            src={videoSrc.videoSrc}
            />
        </div>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string
};

export default connect(VideoPlayer);
