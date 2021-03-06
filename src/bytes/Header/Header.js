import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';
import syncanoLogo from 'bytes/Header/images/syncano.png';
import synqLogo from 'bytes/Header/images/synq.png';

const cn = require('classnames/bind').bind(styles);

const Header = ({
  store: {
    app: { isLoggedIn, username }
  },
  services: {
    app: { logOut, setUserName }
  }
}) => {
  const handleLogOut = () => {
    setUserName('');
    logOut();
  };
  return (
    <div className={cn('Header')}>
      <div className={cn('Header__logo-syncano')}>
        <a href="https://www.syncano.io/" className={cn('Header__logo-link')}><img src={syncanoLogo}/></a>
      </div>
      <div className={cn('Header__logo-plus')}>+</div>
      <div className={cn('Header__logo-synq')}>
        <a href="https://www.synq.fm/" className={cn('Header__logo-link')}><img src={synqLogo}/></a>
      </div>
      <div className={cn('Header__description')}>WebRTC recorder, player and uploader DEMO</div>
      {isLoggedIn ? <div className={cn('Header__logout')}>
        <div className={cn('Header__logout-username')}>
          Logged in as: <span>{username || window.localStorage.username}</span>
        </div>
        <button onClick={handleLogOut}> Log Out </button>
      </div> : null}
    </div>
  );
};

Header.propTypes = {
  services: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default connect(Header);
