import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const LoginForm = ({
  services: {
    app: { logIn }
  }
  }) => {
  const handleSubmit = e => {
    console.log(e.target);
    logIn(true, 'lol');
    e.preventDefault();
  };
  return (
    <div
      className={cn('LoginForm')}
      >
      <form onSubmit={handleSubmit}>
        <input type={'text'} placeholder={'Login'} required/>
        <input type={'password'} placeholder={'Password'} required/>
        <button type={'submit'}>log in</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  services: PropTypes.object
};

export default connect(LoginForm);
