import db from '../../helpers/db'
import fetch from 'node-fetch'

const postData = ARGS.POST

const channelMessage = {
  "payload": {
    "message": postData.video_url
  },
  "room": `default.${postData.username}`
}

const url = `https://api.syncano.rocks/v2/instances/${META.instance}/channels/default/publish/`

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': META.token
  },
  body: JSON.stringify(channelMessage)
}).then(res => res.json())
  .then( json => {
    db.data.video_storage.where('synq_video_id', postData.video_id).first().then( result => {
      db.data.video_storage.update(result.id, {
        embeded_url: postData.video_url,
        synq_widget: postData.embed_url,
        synq_state: postData.state
      })
    })
  })
