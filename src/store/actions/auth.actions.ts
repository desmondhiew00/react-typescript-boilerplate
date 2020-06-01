import _ from 'lodash';
import Cookies from 'universal-cookie';
import { Dispatch } from 'redux';
import { store } from '@constants/app.constants';
import { Actions, User } from '@store/types/auth.types';
import * as AuthAPI from '@api/auth.api';

export const requestLogin = (data: AuthAPI.login) => async (dispatch?: Dispatch) => {
  if (!dispatch) dispatch = store.dispatch;
  dispatch(Actions.requestLogin());
  try {
    const res = await AuthAPI.login(data);
    const { payload } = res.data;
    const user = _.get(payload, 'user');
    const cookieName = _.get(payload, 'cookieName');
    dispatch(Actions.successLogin(user, cookieName));
    return Promise.resolve();
  } catch (e) {
    dispatch(Actions.failLogin());
    return Promise.reject(e);
  }
};

export const requestRevoke = (loader: boolean = false) => async (dispatch?: Dispatch) => {
  if (!dispatch) dispatch = store.dispatch;
  dispatch(Actions.requestRevoke(loader));
  try {
    const res = await AuthAPI.revoke();
    const { payload } = res.data;
    const user = _.get(payload, 'user');
    dispatch(Actions.successRevoke(user));
  } catch (e) {
    dispatch(Actions.failRevoke());
    return Promise.reject(e);
  }
  return Promise.resolve();
};

export const requestLogout = () => async (dispatch?: Dispatch) => {
  if (!dispatch) dispatch = store.dispatch;
  dispatch(Actions.requestLogout());
  try {
    await AuthAPI.logout();
    const { cookieName } = store.getState().auth;
    if (cookieName) {
      const cookies = new Cookies();
      cookies.remove(cookieName, { path: '/' });
    }
    dispatch(Actions.successLogout());
  } catch (e) {
    dispatch(Actions.failLogout());
    return Promise.reject(e);
  }
  return Promise.resolve();
};

export const updateUserInfo = (payload: User) => (dispatch?: Dispatch) => {
  if (!dispatch) dispatch = store.dispatch;
  dispatch(Actions.updateUser(payload));
};
