import { lazyLoad } from 'utils/loadable';

export const StatusTag = lazyLoad(
  () => import('./index'),
  module => module.StatusTag
);

export default StatusTag;
