import { lazyLoad } from 'utils/loadable';

export const Breadcrumb = lazyLoad(
  () => import('./index'),
  module => module.Breadcrumb
);

export default Breadcrumb;
