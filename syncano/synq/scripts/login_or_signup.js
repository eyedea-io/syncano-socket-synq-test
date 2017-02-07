// This script is only simple example for testing purposes only. It should be replaced with proper authentication script or socket.
import connect from 'syncano-server'
import fetch from 'node-fetch'

const server = connect({
  token: META.token,
  instanceName: META.instance,
})
const { users } = server
const { username, password } = ARGS.POST

const createUser = () => {
  const user = {
    email: username,
    username,
    password
  }

  users.create(user)
  .then(res => setResponse(new HttpResponse(200, JSON.stringify(res.user_key), 'application/json')))
  .catch(err => setResponse(new HttpResponse(200, JSON.stringify(err), 'application/json')))
}

const authenticateUser = () => {
  const url = `https://api.syncano.rocks/v2/instances/${META.instance}/users/auth/`
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': META.token
    }
  })
  .then(res => res.json())
  .then(json => setResponse(new HttpResponse(200, JSON.stringify(json.user_key), 'application/json')))
  .catch(({ response: err }) => {
    err.json().then(json => {
      setResponse(new HttpResponse(err.status, JSON.stringify(json), 'application/json'))
    })
  })
}

users
.where('username', 'eq', username)
.firstOrFail()
.then(authenticateUser)
.catch(createUser)
