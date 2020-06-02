import { lazyLoad } from 'utils/loadable';

export const FormItem = lazyLoad(
  () => import('./index'),
  module => module.FormItem
);

export default FormItem;
