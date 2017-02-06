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
  @observable videoBlob: '',
  @observable isRecording: false,
  @observable isProcessing: false,
  @observable isUploading: false,
  @observable isPlaying: false,
  @observable hasInitiated: false,
  @observable hasUploaded: false,
  @observable hasFinished: false,
  @observable videoUrl: '',
  @observable status: ''
};
