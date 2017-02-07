import { observable } from 'utils';

export default {
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
  @observable status: '',
  @observable isLoggedIn: false,
  @observable username: ''
};
