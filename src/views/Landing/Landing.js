import React, { PropTypes } from 'react';
import styles from './styles.css';
import formize from './Landing.formize';
import { Layout, VideoPlayer, VideoUpload } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const Landing = () => (
  <div className={cn('Landing')}>
    <Layout name="Default">
      <VideoPlayer videoSrc={'https://player.synq.fm/embed/4e063ab632f24992aced5c6f8983229f'}/>
      <VideoUpload/>
    </Layout>
  </div>
);

Landing.propTypes = {
  store: PropTypes.object.isRequired,
  formize: PropTypes.object.isRequired
};

export default connect(Landing, { formize });
