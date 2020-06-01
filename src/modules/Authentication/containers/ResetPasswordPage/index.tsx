import React from 'react';
import { AuthWrapper } from '../AuthWrapper';
import { ResetPasswordForm } from '../../components/ResetPasswordForm';

export const ResetPasswordPage = () => {
  return (
    <AuthWrapper>
      <ResetPasswordForm />
    </AuthWrapper>
  );
};

export default ResetPasswordPage;
