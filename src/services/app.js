import { action } from 'utils';

export default class app {
  @action setLanguage = language => {
    this.store.app.language = language;
  }
  @action setVideoSrc = src => {
    this.store.app.videoSrc = src;
  }
  @action setVideoBlob = src => {
    this.store.app.videoBlob = src;
  }
  @action getVideoSrc = () => {
    return this.store.app.videoSrc;
  }
  @action setRecordingState = state => {
    this.store.app.isRecording = state;
  }
  @action setProcessingState = state => {
    this.store.app.isProcessing = state;
  }
  @action setFinished = state => {
    this.store.app.hasFinished = state;
  }
  @action setUploaded = state => {
    this.store.app.hasUploaded = state;
  }
  @action setInitiated = state => {
    this.store.app.hasInitiated = state;
  }
  @action setUploadState = state => {
    this.store.app.isUploading = state;
  }
  @action setPlayState = state => {
    this.store.app.isPlaying = state;
  }
  @action setStatus = state => {
    this.store.app.status = state;
  }
  @action setVideoUrl = state => {
    this.store.app.videoUrl = state;
  }
  @action resetStates = () => {
    this.store.app.isProcessing = false;
    this.store.app.hasFinished = false;
    this.store.app.hasUploaded = false;
    this.store.app.hasInitiated = false;
    this.store.app.isUploading = false;
    this.store.app.status = '';
  }
  @action logIn = (status, password) => {
    this.store.app.isLoggedIn = status;
    console.log(status, password);
  }
}
