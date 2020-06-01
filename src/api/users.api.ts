import { apiCaller, GetRequestParams } from './index';

export const getUsers = (params: GetRequestParams) => apiCaller.get('/users', { params });
