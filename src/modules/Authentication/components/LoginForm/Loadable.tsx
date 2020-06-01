import { lazyLoad } from '@utils/loadable';

export const LoginForm = lazyLoad(
  () => import('./index'),
  module => module.LoginForm
);

export default LoginForm;
