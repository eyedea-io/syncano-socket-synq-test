import { computed, observable } from 'utils';

export default {
  @observable language: 'en',
  @computed get helloMessage() {
    return {
      en: 'Hello',
      pl: 'Cześć'
    }[this.language];
  },
  @observable videoSrc: [],
  @computed get getVideoSrc() {
    return this.store.app.videoSrc;
  },
  @observable videoBlob: '',
  @computed get getVideoBlob() {
    return this.store.app.videoBlob;
  },
  @observable isRecording: false,
  @computed get getRecordingState() {
    return this.store.app.isRecording;
  },
  @observable isProcessing: false,
  @computed get getProcessingState() {
    return this.store.app.isProcessing;
  },
  @observable isUploading: false,
  @computed get getUploadState() {
    return this.store.app.isUploading;
  },
  @observable isPlaying: false,
  @computed get getPlayState() {
    return this.store.app.isPlaying;
  }
};
