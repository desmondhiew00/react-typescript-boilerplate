export enum ActionType {
  REQUEST_LOGIN = 'auth/REQUEST_LOGIN',
  SUCCESS_LOGIN = 'auth/SUCCESS_LOGIN',
  FAIL_LOGIN = 'auth/FAIL_LOGIN',
  REQUEST_REVOKE = 'auth/REQUEST_REVOKE',
  SUCCESS_REVOKE = 'auth/SUCCESS_REVOKE',
  FAIL_REVOKE = 'auth/FAIL_REVOKE',
  REQUEST_LOGOUT = 'auth/REQUEST_LOGOUT',
  SUCCESS_LOGOUT = 'auth/SUCCESS_LOGOUT',
  FAIL_LOGOUT = 'auth/FAIL_LOGOUT',
  UPDATE_USER = 'auth/UPDATE_USER'
}

export const Actions = {
  requestLogin: (): REQUEST_LOGIN => ({ type: ActionType.REQUEST_LOGIN }),
  successLogin: (user: User, cookieName: string): SUCCESS_LOGIN => ({
    type: ActionType.SUCCESS_LOGIN,
    payload: { user, cookieName }
  }),
  failLogin: (): FAIL_LOGIN => ({ type: ActionType.FAIL_LOGIN }),
  requestRevoke: (loader: boolean = true): REQUEST_REVOKE => ({ type: ActionType.REQUEST_REVOKE, payload: loader }),
  successRevoke: (payload: User): SUCCESS_REVOKE => ({ type: ActionType.SUCCESS_REVOKE, payload }),
  failRevoke: (): FAIL_REVOKE => ({ type: ActionType.FAIL_REVOKE }),
  requestLogout: (): REQUEST_LOGOUT => ({ type: ActionType.REQUEST_LOGOUT }),
  successLogout: (): SUCCESS_LOGOUT => ({ type: ActionType.SUCCESS_LOGOUT }),
  failLogout: (): FAIL_LOGOUT => ({ type: ActionType.FAIL_LOGOUT }),
  updateUser: (payload: User): UPDATE_USER => ({ type: ActionType.UPDATE_USER, payload })
};

// ---------- Start TypeScript Interfaces ---------- //

export interface AuthState {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isRevoking: boolean;
  user: User;
  cookieName: string;
  login: { isSubmitting: boolean };
  logout: { isSubmitting: boolean };
}

export interface User {
  id?: number | null;
  name?: string;
  email?: string;
}

interface BaseAction {
  type: ActionType;
}

interface REQUEST_LOGIN extends BaseAction {
  type: ActionType.REQUEST_LOGIN;
}
interface SUCCESS_LOGIN extends BaseAction {
  type: ActionType.SUCCESS_LOGIN;
  payload: {
    user: User;
    cookieName: string;
  };
}
interface FAIL_LOGIN extends BaseAction {
  type: ActionType.FAIL_LOGIN;
}
interface REQUEST_REVOKE extends BaseAction {
  type: ActionType.REQUEST_REVOKE;
  payload: boolean;
}
interface SUCCESS_REVOKE extends BaseAction {
  type: ActionType.SUCCESS_REVOKE;
  payload: User;
}
interface FAIL_REVOKE extends BaseAction {
  type: ActionType.FAIL_REVOKE;
}
interface REQUEST_LOGOUT extends BaseAction {
  type: ActionType.REQUEST_LOGOUT;
}
interface SUCCESS_LOGOUT extends BaseAction {
  type: ActionType.SUCCESS_LOGOUT;
}
interface FAIL_LOGOUT extends BaseAction {
  type: ActionType.FAIL_LOGOUT;
}
interface UPDATE_USER extends BaseAction {
  type: ActionType.UPDATE_USER;
  payload: User;
}

export type AuthActions =
  | REQUEST_LOGIN
  | SUCCESS_LOGIN
  | FAIL_LOGIN
  | REQUEST_REVOKE
  | SUCCESS_REVOKE
  | FAIL_REVOKE
  | REQUEST_LOGOUT
  | SUCCESS_LOGOUT
  | FAIL_LOGOUT
  | UPDATE_USER;
