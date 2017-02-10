import fetch from 'node-fetch'
import FormData from 'form-data'
import db from '../helpers/db'
import envs from '../helpers/envs'
import respond from '../helpers/respond'

const user = META.user || {}
const postData = ARGS.POST

if( !user.hasOwnProperty('id') ){
  respond.error({message: 'Unauthorized endpoint call'}, 401)
  process.exit()
}

const updateVideoObject = data => {
  db.data.video_storage
  .update(postData.id, { meta: data.userdata })
  .then(response => respond.json("Success"))
  .catch(err => respond.error(err))
}

const updateSynq = data => {
  const userData = Object.assign({}, {
    user_key: user.user_key,
    username: user.username,
    instance: META.instance
  }, postData.payload)

  const updateForm = new FormData()
  updateForm.append('api_key', envs.synqApiKey)
  updateForm.append('video_id', data.synq_video_id)
  updateForm.append('userdata', JSON.stringify(userData))

  fetch(`${envs.synqUrl}video/update`, {method: 'POST', body: updateForm })
  .then(res => res.json())
  .then(updateVideoObject)
  .catch(err => respond.error(err))
}

db.data.video_storage
.where('id', postData.id)
.where('user', user.id)
.firstOrFail()
.then(updateSynq)
.catch(err => respond.error(err))
