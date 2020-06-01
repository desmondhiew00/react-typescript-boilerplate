import _ from 'lodash';
import { AuthState, ActionType, AuthActions } from '../types/auth.types';

const {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  REQUEST_REVOKE,
  SUCCESS_REVOKE,
  FAIL_REVOKE,
  REQUEST_LOGOUT,
  SUCCESS_LOGOUT,
  FAIL_LOGOUT,
  UPDATE_USER
} = ActionType;

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  isRevoking: true,
  user: { id: null, name: '', email: '' },
  cookieName: '',
  login: { isSubmitting: false },
  logout: { isSubmitting: false }
};

export const AuthReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isAuthenticating: true, login: { isSubmitting: true } };
    case SUCCESS_LOGIN:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        login: { isSubmitting: false },
        user: _.get(action, 'payload.user', state.user),
        cookieName: _.get(action, 'payload.cookieName', state.cookieName)
      };
    case FAIL_LOGIN:
      return { ...initialState, isRevoking: false };
    case REQUEST_REVOKE:
      return { ...state, isRevoking: action.payload };
    case SUCCESS_REVOKE:
      return { ...state, isAuthenticated: true, isRevoking: false, user: action.payload };
    case FAIL_REVOKE:
      return { ...initialState, isRevoking: false };
    case REQUEST_LOGOUT:
      return { ...state, logout: { isSubmitting: true } };
    case SUCCESS_LOGOUT:
      return { ...initialState, isRevoking: false };
    case FAIL_LOGOUT:
      return { ...state, logout: { isSubmitting: false } };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
