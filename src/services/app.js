import { action } from 'utils';

export default class app {
  @action fetchVideos = async () => {
    const list = 'https://resonance-damp-2382.syncano.link/synq/list/';
    fetch(list, {
      headers: {
        'X-USER-KEY': window.localStorage.token
      },
      method: 'GET'
    }).then(data => data.json().then(data => {
      this.setVideoList(data);
    }));
  };
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
  @action logOut = () => {
    window.localStorage.clear();
    this.store.app.isLoggedIn = false;
  }
  setLoggedIn = status => {
    this.store.app.isLoggedIn = status;
  }
  @action setUserName = username => {
    this.store.app.username = username;
  }
  userName = username => {
    this.store.app.username = username;
  }
  setVideoL = videos => {
    this.store.app.videoList = videos;
  }
  @action setVideoList = videos => {
    this.store.app.videoList = videos;
  }
  @action logIn = (username, password) => {
    const url = 'https://resonance-damp-2382.syncano.link/synq/login_or_signup/';
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    fetch(url, {
      method: 'POST',
      body: form
    }).then(res => {
      if (res.ok) {
        res.json()
          .then(data => {
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('username', data.username);
            const list = 'https://resonance-damp-2382.syncano.link/synq/list/';
            fetch(list, {
              headers: {
                'X-USER-KEY': data.token
              },
              method: 'GET'
            }).then(data => data.json().then(data => {
              this.setVideoList(data);
              window.localStorage.setItem('videos', data);
            }));
            this.userName(data.username);
          });
        this.setLoggedIn(true);
      } else {
        throw new Error('Something went wrong');
      }
    }).catch(err => {
      console.error(err);
    });
  }
}
