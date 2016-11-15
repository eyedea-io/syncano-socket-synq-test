import requests
import syncano
import json
from syncano.models import Object

data = ARGS['POST']

def handle_response(status, message):
    json_content = json.dumps({'status': status, 'message': message})
    set_response(HttpResponse(status_code=status, content=json_content, content_type='application/json'))

if 'id' not in data:
    handle_response(404, 'Syncano object \'id\' cannot be found in request')
else:
    try:
        SYNQ_UPLOADER_URL = CONFIG['SYNQ_API_LINK'] + 'video/uploader'

        connection = syncano.connect(
            api_key=CONFIG['SYNCANO_API_KEY'],
            user_key=CONFIG['SYNCANO_USER_TOKEN'],
            instance_name=CONFIG['SYNCANO_INSTANCE_NAME'])

        syncano_object = Object.please.get(
            id=data['id'],
            class_name=CONFIG['VIDEO_STORAGE']
            )

        r = requests.post(SYNQ_UPLOADER_URL, data = {
        'api_key': CONFIG['SYNQ_API_KEY'],
        'video_id': syncano_object.synq_video_id,
        'timeout': '2 days'
        })

        if r.text == 'Internal server error. Sorry.\n':
            handle_response(404, 'Bad response from SYNQ: ' + r.text)
        else:
            handle_response(200, r.text)

            Object.please.update(
                id=data['id'],
                class_name=CONFIG['VIDEO_STORAGE'],
                synq_widget=r.text
            )
    except Exception, e:
        handle_response(404, e.message)
