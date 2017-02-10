import fetch from 'node-fetch'
import FormData from 'form-data'
import db from '../helpers/db'
import respond from '../helpers/respond'

const videoObject = ARGS.POST
const user = META.user || {}

if( !user.hasOwnProperty('id') ){
  respond.error({message: 'Unauthorized endpoint call'}, 401)
  process.exit()
}

db.data.video_storage
.where('user', user.id)
.where('id', videoObject.id)
.firstOrFail()
.then(() => {
  db.data.video_storage.delete(videoObject.id)
    .then(() => respond.json('Success'))
    .catch(err => respond.error(err))
})
.catch(err => respond.error(err))
