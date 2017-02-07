import React, { PropTypes } from 'react';
import { Match, Miss } from 'react-router';
import { connect, MatchAsMember, MatchAsGuest } from 'utils';

import { Landing, NotFound } from 'views';

const Routes = ({
  services: {
    app: { logInUser }
  }
}) => {
  if (window.localStorage.getItem('token')) {
    console.warn('TOKEN FROM STORAGE %c %s', 'color: green; font-size: 24px', window.localStorage.getItem('token'));
    logInUser(true);
  } else {
    logInUser(false);
  }
  return (
    <div className="App">
      <Match pattern="/" exactly component={Landing}/>
      <MatchAsMember pattern="/private" exactly component={Landing} redirectTo="/"/>
      <MatchAsGuest pattern="/public" exactly component={Landing}/>
      <Miss component={NotFound}/>
    </div>
  );
};
Routes.propTypes = {
  services: PropTypes.object.isRequired
};

export default connect(Routes);
