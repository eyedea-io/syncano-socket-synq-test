import React, { PropTypes } from 'react';
import styles from './styles.css';
import { connect } from 'utils';

const cn = require('classnames/bind').bind(styles);

const ProcessLogs = ({
  store: {
    app: { hasInitiated, hasUploaded, hasFinished, videoUrl }
  }
  }) => {
  return (
    <div
      style={hasInitiated ? {display: 'block'} : {display: 'none'}}
      className={cn('ProcessLogs')}
      >
      <ul>
        {hasInitiated ? <li><span className={cn('ProcessLogs__tick')}>✓</span> Video obeject inititated (Syncano)</li> : null }
        {hasUploaded ? <li><span className={cn('ProcessLogs__tick')}>✓</span> Upload started (SYNQ)</li> : null}
        {hasFinished ? <li><span className={cn('ProcessLogs__tick')}>✓</span> Upload finished - your video is ready!</li> : null}
        {hasFinished ? <li><span className={cn('ProcessLogs__link')}>&#8594;</span> Here is your link: <a href={videoUrl} target={'_blank'} rel="noopener noreferrer"> Click here</a></li> : null}
      </ul>
    </div>
  );
};

ProcessLogs.propTypes = {
  store: PropTypes.object
};

export default connect(ProcessLogs);
