import requests
import syncano
from syncano.models import Object

SYNC_CREATE_URL = CONFIG['SYNQ_API_LINK'] + 'video/create'
SYNC_STREAM_URL = CONFIG['SYNQ_API_LINK'] + 'video/stream'

connection = syncano.connect(
    api_key=CONFIG['SYNCANO_API_KEY'],
    user_key=CONFIG['SYNCANO_USER_TOKEN'],
    instance_name=CONFIG['SYNCANO_INSTANCE_NAME'])

print ARGS

r = requests.post(SYNC_CREATE_URL, data = {
    'api_key': CONFIG['SYNQ_API_KEY']
    })

synq_response_json = r.json()
Object.please.create(
    synq_create=synq_response_json,
    embed_url=CONFIG['SYNQ_LINK']+'embed/'+synq_response_json['video_id'],
    synq_state=synq_response_json['state'],
    synq_video_id=synq_response_json['video_id'],
    class_name='video_storage'
)

synq_create_stream = requests.post(SYNC_STREAM_URL, data = {
    'api_key': CONFIG['SYNQ_API_KEY'],
    'video_id': synq_response_json['video_id']
    })
    
synq_create_stream_json = synq_create_stream.json()
    
set_response(HttpResponse(status_code=201, content=synq_create_stream_json, content_type='application/json'))