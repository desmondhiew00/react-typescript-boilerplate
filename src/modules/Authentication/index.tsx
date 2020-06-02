//  These routes will be unaccessible when user was authenticated.
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginPage } from '@modules/Authentication/containers/LoginPage/Loadable';
import { ResetPasswordPage } from '@modules/Authentication/containers/ResetPasswordPage/Loadable';

export const AuthenticationRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  );
};

export default AuthenticationRoutes;
