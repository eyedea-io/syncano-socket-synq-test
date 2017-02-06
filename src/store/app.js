import { observable } from 'utils';

export default {
  @observable videoSrc: [],
  @observable videoBlob: '',
  @observable isRecording: false,
  @observable isProcessing: false,
  @observable isUploading: false,
  @observable isPlaying: false,
  @observable hasInitiated: true,
  @observable hasUploaded: true,
  @observable hasFinished: true,
  @observable videoUrl: '',
  @observable status: '',
  @observable isLoggedIn: false
};
