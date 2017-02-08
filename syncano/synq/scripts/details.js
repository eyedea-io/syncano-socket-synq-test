import fetch from 'node-fetch'
import FormData from 'form-data'
import db from '../../helpers/db'
import respond from '../../helpers/respond'
import envs from '../../helpers/envs'

const user = META.user || {}
const postData = ARGS.POST

if( !user.hasOwnProperty('id') ){
  respond.error({message: 'Unauthorized endpoint call'}, 401)
  process.exit()
}

const details = syncanoObject => {
  const detailForm = new FormData()
  detailForm.append('api_key', envs.synqApiKey)
  detailForm.append('video_id', syncanoObject.synq_video_id)
  fetch(`${envs.synqUrl}video/details`, {method: 'POST', body: detailForm })
  .then(response => response.json())
  .then(data => respond.json(data))
  .catch(err => respond.error(err))
}

db.data.video_storage
.where('id', postData.id)
.where('user', user.id)
.firstOrFail()
.then(details)
.catch(err => respond.error(err))
