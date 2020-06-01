export enum Types {
  SET_SIDEBAR_COLLAPSED = 'app/SET_SIDEBAR_COLLAPSED'
}

export const Actions = {
  setSidebarCollapsed: (collapsed: boolean): Actions => ({ type: Types.SET_SIDEBAR_COLLAPSED, payload: collapsed })
};

// ---------- Start TypeScript Interfaces ---------- //

export interface AppState {
  sidebar: { collapsed: boolean };
}

interface BaseAction {
  type: Types;
}
interface SET_SIDEBAR_COLLAPSED extends BaseAction {
  type: Types.SET_SIDEBAR_COLLAPSED;
  payload: boolean;
}

export type Actions = SET_SIDEBAR_COLLAPSED;
