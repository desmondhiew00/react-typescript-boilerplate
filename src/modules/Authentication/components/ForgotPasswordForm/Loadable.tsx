import { lazyLoad } from '@utils/loadable';

export const ForgotPasswordForm = lazyLoad(
  () => import('./index'),
  module => module.ForgotPasswordForm
);

export default ForgotPasswordForm;
