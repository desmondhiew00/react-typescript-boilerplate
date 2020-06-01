import axios from 'axios';

const { API_URL } = process.env;

export const apiCaller = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  withCredentials: true
});

type OrderBy = 'asc' | 'desc';
export interface GetRequestParams {
  attributes?: string;
  include?: string;
  order?: string;
  orderBy?: OrderBy;
  paranoid?: boolean;
  limit?: number;
  offset?: number;
  [x: string]: any;
}
