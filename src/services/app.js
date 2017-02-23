import { action } from 'utils';

const SYNCANO_BASE_URL = process.env.SYNCANO_BASE_URL;
export default class app {
  @action fetchVideos = async () => {
    const list = `${SYNCANO_BASE_URL}/synq/list/`;
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
  @action setVideoBlob = src => {
    this.store.app.videoBlob = src;
  }
  @action setRecordingState = state => {
    this.store.app.isRecording = state;
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
  @action setStatus = state => {
    this.store.app.status = state;
  }
  @action setVideoUrl = state => {
    this.store.app.videoUrl = state;
  }
  @action logOut = () => {
    window.localStorage.clear();
    this.store.app.isLoggedIn = false;
    this.store.app.status = '';
    this.store.app.videoBlob = '';
  }
  @action logInUser = status => {
    this.store.app.isLoggedIn = status;
  }
  @action setUserName = username => {
    this.store.app.username = username;
  }
  @action setVideoList = videos => {
    this.store.app.videoList = videos;
  }
  @action resetStates = () => {
    this.store.app.hasFinished = false;
    this.store.app.hasUploaded = false;
    this.store.app.hasInitiated = false;
    this.store.app.status = '';
  }
  @action logIn = (username, password) => {
    const url = `${SYNCANO_BASE_URL}/synq/login_or_signup/`;
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
            if (Object.keys(data).length > 0) {
              window.localStorage.setItem('token', data.token);
              window.localStorage.setItem('username', data.username);
              const list = `${SYNCANO_BASE_URL}/synq/list/`;
              fetch(list, {
                headers: {
                  'X-USER-KEY': data.token
                },
                method: 'GET'
              }).then(data => data.json().then(data => {
                this.setVideoList(data);
                window.localStorage.setItem('videos', data);
              }));
              this.setUserName(data.username);
              this.logInUser(true);
              this.setStatus('');
            } else {
              throw new Error('Can\'t create this user. Try different username');
            }
          }).catch(err => {
            console.log(err);
            this.setStatus(`${err}`);
            this.logInUser(false);
          });
      } else {
        throw new Error(`Something went wrong ${res.status}`);
      }
    }).catch(err => {
      this.setStatus(`${err}`);
      console.error(err);
    });
  }
  @action sendFile = blob => {
    const token = window.localStorage.getItem('token');
    this.setVideoBlob('');
    this.setStatus('');
    this.setVideoUrl('');
    this.setUploaded(false);
    this.setInitiated(false);
    this.setFinished(false);
    const file = (blob[0] ? blob[0] : blob);
    const url = `${SYNCANO_BASE_URL}/synq/upload/`;
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
            fetch(data.url, {
              method: 'POST',
              body: form
            }).then(res => {
              this.setUploaded(true);
              if (res.ok) {
                fetch(`${SYNCANO_BASE_URL}/synq/subscribe_channel/`, {
                  headers: {
                    'X-USER-KEY': token
                  },
                  method: 'GET'
                })
                  .then(res => res.json())
                    .then(json => {
                      this.setFinished(true);
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
