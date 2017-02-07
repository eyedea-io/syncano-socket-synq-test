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
    const username = e.target.childNodes[0].value;
    const password = e.target.childNodes[1].value;
    logIn(username, password);
    e.preventDefault();
  };
  return (
    <div
      className={cn('LoginForm')}
      >
      <h4>Login using existing account or register new one</h4>
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
