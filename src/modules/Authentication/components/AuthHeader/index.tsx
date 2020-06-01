/* eslint-disable global-require */
import React from 'react';
import { APP_NAME, APP_DESCRIPTION } from '@constants/app.constants';

export const AuthHeader = () => (
  <>
    <div className="flex justify-center items-center mb-3 flex-wrap text-center">
      <img className="logo mr-2 ml-2" src={require('@assets/logo.png')} alt="logo" />
      <span className="title mr-2 ml-2">{APP_NAME}</span>
    </div>

    <div className="flex justify-center align-items-center mb-10">
      <span className="description">{APP_DESCRIPTION}</span>
    </div>
  </>
);

export default AuthHeader;
