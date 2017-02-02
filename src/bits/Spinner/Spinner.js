import React, { PropTypes } from 'react';
import styles from './styles.css';

const cn = require('classnames/bind').bind(styles);

const Spinner = ({
  message
}) => (
  <div className={cn('Spinner')}>
    <div className={cn('Spinner__spinner')}/>
    <div className={cn('Spinner__message')}>{message}</div>
  </div>
);

Spinner.propTypes = {
  message: PropTypes.string
};

export default Spinner;
