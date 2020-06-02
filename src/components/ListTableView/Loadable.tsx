import { lazyLoad } from 'utils/loadable';

export const ListTableView = lazyLoad(
  () => import('./index'),
  module => module.ListTableView
);

export default ListTableView;
