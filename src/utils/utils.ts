import _ from 'lodash';
import { AxiosError } from 'axios';
import { notification } from 'antd';

export const getResponseErrorMessage = (e: Error | AxiosError) => {
  if (e && _.isString(e)) return e;
  let errMsg = _.get(e, 'response.data', '');
  if (!errMsg && e instanceof Error) errMsg = e.message;
  return errMsg;
};

export const removeWhiteSpace = (str: string): string => {
  // Remove whitespace
  if (!str) return str;
  if (!_.isString(str)) return str;
  return str.replace(/^\s+|\s+$/g, '');
};

export const printSuccessMessage = (message: string, { title = 'Success!' }: { title?: string } = {}) => {
  notification.success({
    message: title,
    description: message
  });
};

export const printErrorMessage = (
  e: Error | AxiosError,
  { title = 'Oops, something is wrong...' }: { title?: string } = {}
) => {
  notification.error({
    message: title,
    description: getResponseErrorMessage(e)
  });
};

export const splitStringToArray = (str: string, symbol: string): [] | string[] => {
  if (!str) return [];
  const result = str.split(symbol);
  result.forEach((val, index) => {
    result[index] = removeWhiteSpace(val); // Remove white space
  });
  return _.isEmpty(result) ? [] : result;
};
