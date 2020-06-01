import { Dispatch } from 'redux';
import { store } from '@constants/app.constants';
import { Actions } from '@store/types/app.types';

export const setSidebarCollapsed = (collapsed: boolean) => (dispatch?: Dispatch) => {
  if (!dispatch) dispatch = store.dispatch;
  dispatch(Actions.setSidebarCollapsed(collapsed));
};
