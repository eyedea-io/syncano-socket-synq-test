import React, { PropTypes } from 'react';
import styles from './styles.css';
import { Layout, VideoWrapper, LoginForm } from 'bytes';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const Landing = ({
	store: {
		app: { isLoggedIn }
	}
}) => {
  console.log(isLoggedIn);
  return (<div className={cn('Landing')}>
    <Layout name="Default">
      {isLoggedIn ? <VideoWrapper/> : <LoginForm/>}
    </Layout>
  </div>);
};

Landing.propTypes = {
  store: PropTypes.object.isRequired
};

export default connect(Landing);
