import { observable } from 'utils';

export default {
  @observable videoBlob: '',
  @observable isRecording: false,
  @observable hasInitiated: false,
  @observable hasUploaded: false,
  @observable hasFinished: false,
  @observable videoUrl: '',
  @observable status: '',
  @observable isLoggedIn: false,
  @observable username: '',
  @observable videoList: []
};
