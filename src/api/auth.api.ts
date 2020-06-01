import { apiCaller } from './index';

export const login = (data: login) => apiCaller.post('auth/login', data);
export const revoke = () => apiCaller.post('auth/revoke');
export const logout = () => apiCaller.post('auth/logout');
export const forgotPassword = (data: forgotPassword) => apiCaller.post('/auth/forgot-password', data);

export const verifyForgotPasswordUrl = (token: string) =>
  apiCaller.get('/auth/forgot-password/verify', { params: { token } });

export const resetPassword = (data: resetPassword, token: string) =>
  apiCaller.post('/auth/reset-password', { ...data, token });

export interface login {
  email: string;
  password: string;
}

export interface forgotPassword {
  email: string;
}

export interface resetPassword {
  newPassword: string;
  confirmPassword: string;
}
