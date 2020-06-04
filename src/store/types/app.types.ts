export enum Types {
  SET_SIDEBAR_COLLAPSED = 'app/SET_SIDEBAR_COLLAPSED',
  SET_MOBILE_VIEW = 'app/SET_MOBILE_VIEW'
}

export const Actions = {
  setSidebarCollapsed: (collapsed: boolean): Actions => ({ type: Types.SET_SIDEBAR_COLLAPSED, payload: collapsed }),
  setMobileView: (mobileView: boolean): Actions => ({ type: Types.SET_MOBILE_VIEW, payload: mobileView })
};

// ---------- Start TypeScript Interfaces ---------- //

export interface AppState {
  sidebar: { collapsed: boolean };
  mobileView: boolean;
}

interface BaseAction {
  type: Types;
}
interface SET_SIDEBAR_COLLAPSED extends BaseAction {
  type: Types.SET_SIDEBAR_COLLAPSED;
  payload: boolean;
}
interface SET_MOBILE_VIEW extends BaseAction {
  type: Types.SET_MOBILE_VIEW;
  payload: boolean;
}

export type Actions = SET_SIDEBAR_COLLAPSED | SET_MOBILE_VIEW;
