import fetch from 'node-fetch'
import FormData from 'form-data'
import db from '../../helpers/db'
import respond from '../../helpers/respond'

const user = META.user || {}

if( !user.hasOwnProperty('id') ){
  respond.error({message: 'Unauthorized endpoint call'}, 401)
  process.exit()
}

const createForm = new FormData()
const userData = {
  user_key: user.user_key,
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

    db.data.video_storage.create({
      synq_state: json.state,
      synq_video_id: json.video_id,
      user: user.id
    }).then(syncanoObject => {
      fetch('https://api.synq.fm/v1/video/upload', {method: 'POST', body: updateForm })
        .then(res => res.json())
        .then(json => {
          db.data.video_storage.update(syncanoObject.id, {
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
            respond.json(synqAWS)
          })
          .catch(err => respond.error(err))
        })
      })
    })
    .catch(err => respond.error(err))
