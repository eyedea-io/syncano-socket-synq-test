import fetch from 'node-fetch';
import _ from 'lodash'

const syncanoCall = function(endpoint, params, key) {
  return fetch(`https://synq.syncano.link/${endpoint}`,
    {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-USER-KEY': key
      }
    })
}

const s = function(endpoint, key, params) {
  return syncanoCall(endpoint, params, key)
}

describe('Synq', function() {
  const key = {
    token: ''
  }

  it('login or create user in Syncano', function(done) {
    s('synq/login_or_signup/')
      .than(resp => {
        key.token = resp.token
        done()
      })
  })

  it('upload video via input', function(done) {
    s('synq/upload/', token)
      .than(resp => {
        done()
      })
  })

  it('upload video via uploader', function(done) {
    s('synq/uploader/', token)
      .than(resp => {
        done()
      })
  })

  it('list user\'s videos', function(done) {
    s('synq/list/', token)
      .than(resp => {
        done()
      })
  }
  })

  it('get video object details', function(done) {
    const data = {
      id: 1
    }
    s('synq/detials/', token, data)
      .than(resp => {
        done()
      })
  }
  })

  it('update custom user\'s data', function(done) {
    const data = {
      id: 1,
      payload: {
        test: "test"
      }
    }
    s('synq/upload/', token, data)
      .than(resp => {
        done()
      })
  }
  })

  it('delete selected object', function(done) {
    const data = {
      id: 1
    }
    s('synq/delete/', token, data)
      .than(resp => {
        done()
      })
  }
  })

})
