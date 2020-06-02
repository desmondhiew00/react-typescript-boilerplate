import { lazyLoad } from '@utils/loadable';

export const ResetPasswordForm = lazyLoad(
  () => import('./index'),
  module => module.ResetPasswordForm
);

export default ResetPasswordForm;
