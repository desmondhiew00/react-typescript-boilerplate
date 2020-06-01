/* eslint-disable no-restricted-globals */
import validator from 'validator';
import _ from 'lodash';

export const composeValidators = (...args: any[]) => (value: any) => {
  let error: any;
  _.forEach(args, (v: (arg0: any) => any) => {
    const res = v(value);
    if (res) error = res;
  });
  return error;
};

export const required = (value: any) => (value ? undefined : 'This field is required');

export const confirmPassword = (password: any) => (value: any) =>
  value === password ? undefined : 'Password does not match';

export const requiredNumber = (value: string | null | undefined) =>
  value !== null || value !== undefined || value !== '' ? undefined : 'This field is required';

export const requiredBool = (value: boolean) =>
  value === true || value === false ? undefined : 'This field is required';

export const notEmpty = (value: any) => (!_.isEmpty(value) ? undefined : 'This field is required');

export const requiredImage = (value: any) => (value ? undefined : 'You need to upload an image');

export const maxLength = (max: number) => (value: string | any[]) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => (value: string | any[]) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const number = (value: any) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const email = (value: any) => (value && !validator.isEmail(value) ? 'Invalid email address' : undefined);

export const url = (value: any) => (value && !validator.isURL(value) ? 'Invalid URL' : undefined);

export const tooOld = (value: number) => (value && value > 65 ? 'You might be too old for this' : undefined);

export const alphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

export const phoneNumber = (value: string) =>
  value && /^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/.test(value) ? 'Invalid phone number' : undefined;

export const noWhiteSpace = (value: string) => (value && /\s/.test(value) ? 'Spacing is not allowed' : undefined);

export const noAlphabetic = (value: string) =>
  value && /[a-z]/i.test(value) ? 'Alphabetic character is not allowed' : undefined;

export const subdomain = (value: string) =>
  value && /[^a-zA-Z0-9-]/i.test(value) ? 'Only alphanumeric characters or -' : undefined;
