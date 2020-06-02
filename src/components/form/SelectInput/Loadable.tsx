import { lazyLoad } from 'utils/loadable';

export const SelectInput = lazyLoad(
  () => import('./index'),
  module => module.SelectInput
);

export default SelectInput;
