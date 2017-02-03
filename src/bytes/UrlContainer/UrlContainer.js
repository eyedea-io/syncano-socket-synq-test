import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const UrlContainer = ({
  videoUrl
  }) => {
  return (
    <div
      className={cn('UrlContainer')}
      >
      <div className={cn('UrlContainer__url')}>URL</div>
      <div className={cn('UrlContainer__link')}>
        <a href={videoUrl} target={'_blank'}>Here is your video!</a>
      </div>
    </div>
  );
};

UrlContainer.propTypes = {
  videoUrl: PropTypes.string
};

export default connect(UrlContainer);
