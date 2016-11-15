import requests
import syncano
import json
from syncano.models import Object

print META["request"]

connection = syncano.connect(
    api_key=CONFIG["SYNCANO_API_KEY"],
    user_key=CONFIG['SYNCANO_USER_TOKEN'],
    instance_name=CONFIG["SYNCANO_INSTANCE_NAME"])

data = ARGS

synq_file_details = json.loads(META["request"]["HTTP_VIDEO_INPUT"])

list_of_objects = Object.please.list(
    class_name=CONFIG["VIDEO_STORAGE"]).filter(synq_video_id=META["request"]["HTTP_VIDEO_ID"])

for item in list_of_objects:
    if 'duration' in synq_file_details:
        Object.please.update(
            id=item.id,
            synq_state=META["request"]["HTTP_VIDEO_STATE"],
            size=synq_file_details['file_size'],
            duration=synq_file_details['duration'],
            height=synq_file_details['height'],
            width=synq_file_details['width'],
            class_name=CONFIG["VIDEO_STORAGE"]
        )
    else:
        Object.please.update(
            id=item.id,
            synq_state=META["request"]["HTTP_VIDEO_STATE"],
            class_name=CONFIG["VIDEO_STORAGE"]
        )

set_response(HttpResponse(status_code=200, content='Response parsed', content_type='plain/text'))
