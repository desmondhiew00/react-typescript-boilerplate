import { Types, Actions, AppState } from '../types/app.types';

const initialState: AppState = {
  sidebar: { collapsed: false },
  mobileView: false
};

export const AppReducer = (state: AppState = initialState, action: Actions) => {
  switch (action.type) {
    case Types.SET_SIDEBAR_COLLAPSED:
      return { ...state, sidebar: { collapsed: action.payload } };
    case Types.SET_MOBILE_VIEW:
      return { ...state, mobileView: action.payload };
    default:
      return state;
  }
};

export default AppReducer;
