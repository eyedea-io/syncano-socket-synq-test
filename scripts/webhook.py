import requests
import syncano
from syncano.models import Object

print META["request"]

connection = syncano.connect(
    api_key=CONFIG["SYNCANO_API_KEY"],
    user_key=CONFIG['SYNCANO_USER_TOKEN'],
    instance_name=CONFIG["SYNCANO_INSTANCE_NAME"])
    
data = ARGS

list_of_objects = Object.please.list(
    class_name=CONFIG["VIDEO_STORAGE"]).filter(synq_video_id=META["request"]["HTTP_VIDEO_ID"])

for item in list_of_objects:
    Object.please.update(
        id=item.id,
        synq_state=META["request"]["HTTP_VIDEO_STATE"],
        class_name=CONFIG["VIDEO_STORAGE"]
    )