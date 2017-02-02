import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoControls = ({
  store: {
    app: { isPlaying }
  },
  services: {
    app: { setPlayState }
  }
}) => {
  const video = document.getElementById('VPlayer');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');
  // As the video is playing, update the progress bar
  const addListener = () => {
    video.addEventListener('timeupdate', () => {
      // For mobile browsers, ensure that the progress element's max attribute is set
      if (!progress.getAttribute('max')) {
        progress.setAttribute('max', video.duration);
      }
      progress.value = video.currentTime;
      progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });
  };
  if (video) {
    addListener();
  } else {
    console.log(null);
  }
  const handlePlay = () => {
    setPlayState(true);
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };
  const handleStop = () => {
    video.pause();
    video.currentTime = 0;
    progress.value = 0;
    setPlayState(false);
  };
  return (
    <div id="video-controls" className={cn('VideoControls')} data-state="hidden">
      {isPlaying ?
        <button
          id="stop"
          type="button"
          data-state="stop"
          className={cn('VideoPlayer__controls-playpause', 'material-icons')}
          onClick={handleStop}
          >
            pause
        </button> :
        <button
          id="playpause"
          className={cn('VideoPlayer__controls-playpause', 'material-icons')}
          type="button"
          data-state="play"
          onClick={handlePlay}
          >
          play_arrow
        </button>
      }
      <div className={cn('VideoPlayer__controls-progress')}>
        <progress
          id="progress"
          value="0"
          min="0"
          >
          <span id="progress-bar"/>
        </progress>
      </div>
      <button
        id="mute"
        type="button"
        data-state="mute"
        className={cn('VideoPlayer__controls-mute', 'material-icons')}
        >
        volume_off
      </button>
      {/* <button id="volinc" type="button" data-state="volup">Vol+</button>
      <button id="voldec" type="button" data-state="voldown">Vol-</button> */}
      <button
        id="fs"
        type="button"
        data-state="go-fullscreen"
        className={cn('VideoPlayer__controls-fullscreen', 'material-icons')}
        >
          fullscreen
      </button>
    </div>
  );
};

VideoControls.propTypes = {
  services: PropTypes.object,
  store: PropTypes.object
};

export default connect(VideoControls);
