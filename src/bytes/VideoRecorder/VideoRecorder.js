/* eslint camelcase: ["error", {properties: "never"}] */
import React, { PropTypes } from 'react';
import recordRTC from 'recordrtc';
import styles from './styles.css';
import { connect } from 'utils';
import { VideoUpload } from 'bytes';

const cn = require('classnames/bind').bind(styles);

const VideoRecorder = ({
  store: {
    app: {
      isRecording
    }
  },
  services: {
    app: { setVideoBlob, setRecordingState }
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
      setRecordingState(false);
      console.log(videoURL);
      // const recordedBlob = window.recorder.getBlob();
      setVideoBlob(videoURL);
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
    setRecordingState(true);
    const constraints = window.constraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(handleSuccess).catch(handleError);
  };
  return (
    <div className={cn('VideoRecorder')}>
      <video
        autoPlay
        />
      {isRecording ?
        <div className={cn('VideoRecorder__stop')} onClick={onStop}>
          STOP
          <div className={cn('VideoRecorder__stop-square')}/>
        </div> :
        <div onClick={toggleRecorder} className={cn('VideoRecorder__record')}>
          START RECORDING
          <div className={cn('VideoRecorder__record-circle')}/>
        </div>}
      <VideoUpload/>
    </div>
  );
};

VideoRecorder.propTypes = {
  store: PropTypes.object,
  services: PropTypes.object
};

export default connect(VideoRecorder);
