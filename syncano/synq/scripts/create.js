import fetch from 'node-fetch'
import FormData from 'form-data'
import connect from 'syncano-server'

const server = connect({
  token: META.token,
  instanceName: META.instance,
})
const { data } = server
const createForm = new FormData()

createForm.append('api_key', 'CONFIG.SYNQ_API_KEY')

fetch('https://api.synq.fm/v1/video/create', {method: 'POST',	body: createForm })
  .then(res => res.json())
  .then(json => {
    const updateForm = new FormData()

    updateForm.append('api_key', 'CONFIG.SYNQ_API_KEY')
    updateForm.append('video_id', json.video_id)

    data.video_storage.create({
      synq_state: json.state,
      synq_video_id: json.video_id
    }).then(syncanoObject => {
      fetch('https://api.synq.fm/v1/video/upload', {method: 'POST', body: updateForm })
        .then(res => res.json())
        .then(json => {
          data.video_storage.update(syncanoObject.id, {
            synq_upload: json
          }).then(setResponse(new HttpResponse(200, JSON.stringify(json), 'application/json')))
        })
    })
  })


//TODO Add ARG for file, upload file to SYNQ via Syncano

