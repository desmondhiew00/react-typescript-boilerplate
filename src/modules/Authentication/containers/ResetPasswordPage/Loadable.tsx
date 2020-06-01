import { lazyLoad } from 'utils/loadable';

export const ResetPasswordPage = lazyLoad(
  () => import('./index'),
  module => module.ResetPasswordPage
);

export default ResetPasswordPage;
