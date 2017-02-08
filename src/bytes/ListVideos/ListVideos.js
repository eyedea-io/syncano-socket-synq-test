import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const ListVideos = ({
  store: {
    app: { videoList }
  },
  services: {
    app: { fetchVideos }
  }
}) => {
  const handleDelete = e => {
    const id = e.target.attributes[0].value;
    console.log(id);
    const url = 'https://resonance-damp-2382.syncano.link/synq/delete/';
    const token = window.localStorage.token;
    const form = new FormData();
    form.append('id', id);
    fetch(url, {
      headers: {
        'X-USER-KEY': token
      },
      method: 'POST',
      body: form
    }).then(() => {
      fetchVideos();
    });
  };
  return (
    <div className={cn('ListVideos')}>
      <div className={cn('ListVideos__wrapper')}>
        {videoList.length ? videoList.map((video, i) => {
          return (
            <div key={i} className={cn('ListVideos__video')}>
              <div className={cn('ListVideos__control')}>
                <div className={cn('ListVideos__control-id')}>{i + 1}</div>
                <div className={cn('ListVideos__control-remove', 'material-icons')}>
                  <button onClick={handleDelete} data-id={video.id}>delete</button>
                </div>
              </div>
              <div className={cn('ListVideos__url')}>
                <a href={video.url}>Click to open</a>
              </div>
              <div className={cn('ListVideos__preview')} data-id={video.url}>
                <button>PREVIEW</button>
              </div>
            </div>
          );
        }) : null}
      </div>
    </div>
  );
};

ListVideos.propTypes = {
  store: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired
};

export default connect(ListVideos);
