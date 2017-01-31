/* eslint camelcase: ["error", {properties: "never"}] */
import React from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const VideoUpload = (
) => {
  const data = new FormData();
  const handleSend = e => {
    const file = e.target.files[0];
    console.log(file);
    data.append('api_key', process.env.SYNQ_API_KEY);
    const url = 'https://api.synq.fm/v1/video/create';
    fetch(url, {
      method: 'POST',
      body: data
    }).then(data => {
      console.log(data);
    }).catch(err => {
      console.error(err);
    });
  };
  return (
    <div>
      <div className={cn('VideoUpload')}>
        <div className={cn('VideoUpload__toggle', 'mb')}>
          <input
            type="file"
            onChange={handleSend}
            />
        </div>
      </div>
    </div>
  );
};

VideoUpload.propTypes = {
};

export default connect(VideoUpload);
