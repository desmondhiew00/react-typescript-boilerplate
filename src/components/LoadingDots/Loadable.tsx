import { lazyLoad } from 'utils/loadable';

export const LoadingDots = lazyLoad(
  () => import('./index'),
  module => module.LoadingDots
);

export default LoadingDots;
