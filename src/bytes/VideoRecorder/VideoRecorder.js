/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import recordRTC from 'recordrtc';
import styles from './styles.css';
import { VideoPlayer } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoRecorder = ({
  store: {
    app: {
      videoSrc, videoBlob
    }
  },
  services: {
    app: { setVideoBlob }
  }
}) => {
  let constraints;
  const videoWidth = 640;
  const videoHeight = 480;
  const handleSuccess = stream => {
    const recorderSettings = {
      disableLogs: true,
      mimeType: 'video/webm',
      bitsPerSecond: videoWidth * videoHeight * 2
    };
    const video = document.querySelector('video');
    stream.oninactive = () => {
      console.log('Inactive stream');
    };
    window.stream = stream;
    video.srcObject = stream;
    window.recorder = recordRTC(stream, recorderSettings);
    window.recorder.startRecording();
  };
  const onStop = () => {
    window.recorder.stopRecording(videoURL => {
      console.log(videoURL);
      const recordedBlob = window.recorder.getBlob();
      setVideoBlob(window.URL.createObjectURL(recordedBlob));
      window.recorder.getDataURL(dataURL => {
        return dataURL;
      });
      window.stream.getTracks().forEach(track => track.stop());
    });
  };
  const errorMsg = (msg, error) => {
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  };
  const handleError = error => {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
          constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg('getUserMedia error: ' + error.name, error);
  };
  const toggleRecorder = () => {
    const constraints = window.constraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(handleSuccess).catch(handleError);
  };
  const startRecorder = () => {
  };
  return (
    <div>
      <div className={cn('VideoRecorder')}>
        <div className={cn('VideoRecorder__toggle', 'mb')}>
          <VideoPlayer videoSrc={videoSrc} videoBlob={videoBlob} width={videoWidth} height={videoHeight}/>
          <button onClick={toggleRecorder}>Open</button>
          <button onClick={startRecorder}>Record</button>
          <button onClick={onStop}>Stop</button>
        </div>
      </div>
    </div>
  );
};

VideoRecorder.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object
};

export default connect(VideoRecorder);
