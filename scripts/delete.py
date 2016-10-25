import requests
import os
import syncano
from syncano.models import Object

connection = syncano.connect(
    api_key=CONFIG['SYNCANO_API_KEY'],
    user_key=CONFIG['SYNCANO_USER_TOKEN'],
    instance_name=CONFIG['SYNCANO_INSTANCE_NAME'])

SYNC_DELETE_URL = CONFIG["SYNQ_API_LINK"] + 'video/delete'

def removeFromSynq(video_id):
    return requests.post(SYNC_DELETE_URL, data = {
    'api_key': CONFIG['SYNQ_API_KEY'],
    'video_id': video_id
    })
    
selected_object = Object.please.get(
    id=ARGS['id'],
    class_name='video_storage'
    )
    
print removeFromSynq(selected_object.synq_video_id)
    
Object.please.delete(
    id=ARGS['id'],
    class_name='video_storage'
    )