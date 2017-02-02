import React, { PropTypes } from 'react';
import styles from './styles.css';
import formize from './Landing.formize';
import { Layout, VideoWrapper } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const Landing = () => (
  <div className={cn('Landing')}>
    <Layout name="Default">
      <VideoWrapper/>
    </Layout>
  </div>
);

Landing.propTypes = {
  store: PropTypes.object.isRequired,
  formize: PropTypes.object.isRequired
};

export default connect(Landing, { formize });
