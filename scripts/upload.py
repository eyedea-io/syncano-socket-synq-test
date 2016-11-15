import requests
import os
import syncano
from syncano.models import Object

SYNC_UPLOAD_URL = CONFIG['SYNQ_API_LINK'] + 'video/upload'

connection = syncano.connect(
    api_key=CONFIG['SYNCANO_API_KEY'],
    user_key=CONFIG['SYNCANO_USER_TOKEN'],
    instance_name=CONFIG['SYNCANO_INSTANCE_NAME'])

def download_file(url):
    local_filename = url.split('/')[-1]
    r = requests.get(url, stream=True)
    with open(local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024): 
            if chunk:
                f.write(chunk)
    local_size = os.path.getsize(local_filename)
    return (local_filename, local_size)

video_file = ''

if ARGS['synq_state'] == 'created' and ARGS['synq_upload'] is None:
    upload_res = requests.post(SYNC_UPLOAD_URL,data = {
        'api_key':CONFIG['SYNQ_API_KEY'],
        'video_id': ARGS['synq_video_id']
        })
        
    upload_res_json = upload_res.json()
    
    video_file, video_size = download_file(ARGS['video']['value'])
    
    Object.please.update(
        id=ARGS['id'],
        synq_upload=upload_res_json,
        synq_state='uploading',
        class_name='video_storage',
        meta=upload_res_json['Content-Type'],
        size=video_size,
        extension=ARGS['video']['value'].split('/')[-1]
    )
    
    fh = open(video_file, 'rb')
    
    send_video = requests.post(upload_res_json['action'], files = {'file': fh}, data = {
        'AWSAccessKeyId': upload_res_json['AWSAccessKeyId'],
        'Content-Type': upload_res_json['Content-Type'],
        'Policy': upload_res_json['Policy'],
        'Signature': upload_res_json['Signature'],
        'acl': upload_res_json['acl'],
        'key': upload_res_json['key'],
    })