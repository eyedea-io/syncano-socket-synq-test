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
  @action logInUser = status => {
    this.store.app.isLoggedIn = status;
  }
  setLoggedIn = status => {
    this.store.app.isLoggedIn = status;
  }
  @action logIn = (username, password) => {
    const url = 'https://resonance-damp-2382.syncano.link/synq/login_or_signup/';
    const user = { username, password };
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    console.log(user);
    fetch(url, {
      method: 'POST',
      body: form
    }).then(res => {
      if (res.ok) {
        res.json()
          .then(data => {
            window.localStorage.setItem('token', data.token);
            console.log(data.token);
          });
        this.setLoggedIn(true);
        console.log(this.store.app.isLoggedIn);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch(err => {
      console.error(err);
    });
  }
}
