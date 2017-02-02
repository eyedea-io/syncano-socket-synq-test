# syncano-socket-synq
Integration between Syncano and SYNQ (https://www.synq.fm)

```js
function on_video_update(oldVideo, newVideo) {

  // Set the url we want to send the webhook to
  url = "https://resonance-damp-2382.syncano.link/synq/webhook/"
  var video_url = newVideo.get("input.url");
  var video_embed_url = newVideo.get("player.embed_url");
  var video_state = newVideo.state;
  var video_id = newVideo.video_id;
  // Check for upload complete
  if(
    oldVideo.state != "uploaded"
    &&
    newVideo.state == "uploaded"
    ){
    v1.http.POST({
      "url": url,
      "rawBody": "video_url=" + video_url + "&video_id=" + video_id + "&state=" + video_state + "&embed_url=" + video_embed_url
    });
  }
}
```
