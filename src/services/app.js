import { action } from 'utils';

export default class app {
  @action fetchVideos = async () => {
    const list = 'https://resonance-damp-2382.syncano.link/synq/list/';
    if (window.localStorage.token) {
      fetch(list, {
        headers: {
          'X-USER-KEY': window.localStorage.token
        },
        method: 'GET'
      }).then(data => data.json().then(data => {
        this.setVideoList(data);
      }));
    }
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
  @action sendBlob = blob => {
    const token = window.localStorage.getItem('token');
    this.setUploadState(true);
    this.setProcessingState(false);
    this.setVideoBlob('');
    this.setStatus('');
    this.setVideoUrl('');
    this.setUploaded(false);
    this.setInitiated(false);
    this.setFinished(false);
    const file = blob;
    const url = 'https://resonance-damp-2382.syncano.link/synq/upload/';
    fetch(url, {
      headers: {
        'X-USER-KEY': token
      },
      method: 'GET'
    }).then(data => {
      if (data.ok) {
        this.setInitiated(true);
        data.json()
          .then(data => {
            const form = new FormData();
            const formObject = data.form;
            for (const key in formObject) {
              if (Object.prototype.hasOwnProperty.call(formObject, key)) {
                form.append(key, formObject[key]);
              }
            }
            form.append('file', file);
            this.setUploadState(false);
            this.setProcessingState(true);
            fetch(data.url, {
              method: 'POST',
              body: form
            }).then(res => {
              this.setUploaded(true);
              if (res.ok) {
                fetch('https://resonance-damp-2382.syncano.link/synq/subscribe_channel/', {
                  headers: {
                    'X-USER-KEY': token
                  },
                  method: 'GET'
                })
                  .then(res => res.json())
                    .then(json => {
                      this.setFinished(true);
                      this.setProcessingState(false);
                      this.setStatus('Completed!');
                      this.setVideoUrl(json.payload.message);
                      this.setVideoBlob(json.payload.message);
                      this.fetchVideos();
                    });
              } else {
                throw new Error(`Response ${res.status}`);
              }
            }).catch(err => {
              if (err) {
                this.setProcessingState(false);
                this.setStatus(`Something went wrong: ${err}`);
                console.error(err);
              }
            });
          });
      } else {
        throw new Error(`Response ${data.status}`);
      }
    }).catch(err => {
      this.setUploadState(false);
      this.store.app.status = `Something went wrong: ${err}`;
      console.error(err);
    });
  }
}
