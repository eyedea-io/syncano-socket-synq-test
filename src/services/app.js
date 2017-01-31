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
}
