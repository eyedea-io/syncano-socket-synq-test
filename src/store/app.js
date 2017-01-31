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
    return this.store.app.videoSrc;
  }
};
