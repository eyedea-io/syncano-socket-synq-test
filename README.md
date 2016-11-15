# syncano-socket-synq
Integration between Syncano and SYNQ [https://www.synq.fm](https://www.synq.fm)

## Status
Current _devel_ branch is based on Synq staging server.

## Synq functions
In order to get response from Synq, you'll need to create 3 webhooks as presented below:

######On video creation:
    function on_video_create(new_video) {
      var url = URL_TO_SOCKET_WEBHOOK
        __internal_POST({
          "url": url,
          "headers": {
            "Content-Length": "0",
            "Video-Id": new_video.video_id,
            "Video-State": new_video.state,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
    }

######On metadata change:
    function on_video_update(old_video, new_video) {
      var url = URL_TO_SOCKET_WEBHOOK
        __internal_POST({
          "url": url,
          "headers": {
            "Content-Length": "0",
            "Video-Id": new_video.video_id,
            "Video-State": new_video.state,
            "Video-Input": JSON.stringify(new_video.input),
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
    }

######On video delete:
    function on_video_delete(old_video) {
        var url = URL_TO_SOCKET_WEBHOOK
        __internal_POST({
          "url": url,
          "headers": {
            "Content-Length": "0",
            "Video-Id": old_video.video_id,
            "Video-State": "delete",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
    }
