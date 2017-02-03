import fetch from 'node-fetch'
import FormData from 'form-data'
import connect from 'syncano-server'

const server = connect({
  token: META.token,
  instanceName: META.instance,
})
const user = META.user || {}

if( !user.hasOwnProperty('id') ){
  setResponse(new HttpResponse(401, JSON.stringify({message: 'Unauthorized endpoint call'}), 'application/json'))
  process.exit()
}

const { data } = server
const createForm = new FormData()
const userData = {
  user_id: user.id,
  username: user.username
}

createForm.append('api_key', '<synq_api>')
createForm.append('userdata', JSON.stringify(userData))

fetch('https://api.synq.fm/v1/video/create', {method: 'POST', body: createForm })
  .then(res => res.json())
  .then(json => {
    const updateForm = new FormData()

    updateForm.append('api_key', '<synq_api>')
    updateForm.append('video_id', json.video_id)

    data.video_storage.create({
      synq_state: json.state,
      synq_video_id: json.video_id,
      user: user.id
    }).then(syncanoObject => {
      fetch('https://api.synq.fm/v1/video/upload', {method: 'POST', body: updateForm })
        .then(res => res.json())
        .then(json => {
          data.video_storage.update(syncanoObject.id, {
            synq_upload: json,
          }).then(() => {
            const synqAWS = {
              url: json.action,
              form: {
                AWSAccessKeyId: json.AWSAccessKeyId,
                'Content-Type': json['Content-Type'],
                Policy: json.Policy,
                Signature: json.Signature,
                acl: json.acl,
                key: json.key
              }
            }
            setResponse(new HttpResponse(200, JSON.stringify(synqAWS), 'application/json'))
          })
        })
    })
  })
