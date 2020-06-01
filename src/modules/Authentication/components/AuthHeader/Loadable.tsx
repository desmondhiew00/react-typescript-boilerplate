import { lazyLoad } from '@utils/loadable';

export const AuthHeader = lazyLoad(
  () => import('./index'),
  module => module.AuthHeader
);

export default AuthHeader;
