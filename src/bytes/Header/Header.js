import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';
import { Link } from 'bits';
import { Wrapper } from 'bytes';

const cn = require('classnames/bind').bind(styles);

const Header = () => {
  console.log('');

  return (
    <div className={cn('Header')}>
      <Wrapper className={cn('Header__inner')}>
        <div className={cn('Header__logo')}>
          <a href="/" className={cn('Header__logo-link')}>Logo</a>
        </div>

        <ul className={cn('Header__nav', 'Nav')}>
          <li className={cn('Nav__item')}>
            <Link className={cn('Nav__item-link')} to="/">Home</Link>
          </li>
          <li className={cn('Nav__item')}/>
        </ul>
      </Wrapper>
    </div>
  );
};

Header.propTypes = {
  store: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired
};

export default connect(Header);
