/**
 * Combine all reducers in this file and export the combined reducers.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';

import { RootState } from 'store/types';
import app from '@reducers/app.reducers';
import auth from '@reducers/auth.reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const createReducer = (injectedReducers: InjectedReducersType = {}) => {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  // eslint-disable-next-line no-console
  // if (Object.keys(injectedReducers).length === 0) return state => state;
  return combineReducers<RootState>({
    ...injectedReducers,
    app,
    auth
  });
};
