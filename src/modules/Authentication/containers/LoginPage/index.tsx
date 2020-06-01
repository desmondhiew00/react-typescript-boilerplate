/* eslint-disable global-require */
import React, { useState } from 'react';

import AuthWrapper from '../AuthWrapper';
import LoginFrom from '../../components/LoginForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <AuthWrapper>
      {isLogin ? (
        <LoginFrom onLinkClicked={() => setIsLogin(false)} />
      ) : (
        <ForgotPasswordForm onLinkClicked={() => setIsLogin(true)} />
      )}
    </AuthWrapper>
  );
};

export default LoginPage;
