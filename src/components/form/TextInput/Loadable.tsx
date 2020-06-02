import { lazyLoad } from 'utils/loadable';

export const TextInput = lazyLoad(
  () => import('./index'),
  module => module.TextInput
);
export const TextAreaInput = lazyLoad(
  () => import('./index'),
  module => module.TextAreaInput
);
export const TextSearchInput = lazyLoad(
  () => import('./index'),
  module => module.TextSearchInput
);

export default TextInput;
