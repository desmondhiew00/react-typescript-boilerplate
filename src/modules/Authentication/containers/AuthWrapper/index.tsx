import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import AuthHeader from '../../components/AuthHeader';

import './AuthWrapper.scss';

export const AuthWrapper = props => {
  const { children } = props;

  return (
    <div className="auth-wrapper">
      <Scrollbars>
        <div className="scroll-content">
          <AuthHeader />
          <div className="form-container">{children}</div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default AuthWrapper;
