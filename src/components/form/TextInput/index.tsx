/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import { Input } from 'antd';
import { FieldProps } from 'formik';
import _ from 'lodash';
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import FormItem, { omitFormikProps } from '../FormItem';

type format = 'mobile' | 'tel' | 'prefix' | 'uppercase' | 'lowercase' | 'capitalize' | 'camelcase' | undefined;
interface CustomProps {
  format?: format;
  readOnly?: boolean;
  autoFocus?: boolean;
}
type toOmit = 'form' | 'readOnly' | 'autoFocus';

interface TextAreaInputProps extends FieldProps, Omit<TextAreaProps, toOmit>, CustomProps {}
export const TextAreaInput: React.FC<TextAreaInputProps> = props => {
  const { form, field, autoFocus, readOnly } = props;
  const { setFieldValue } = form;
  const inputRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    const value = valueFormatter(e.target.value, props.format);
    setFieldValue(field.name, value);
  };

  return (
    // @ts-ignore
    <FormItem {...props}>
      <Input.TextArea {...omitFormikProps(props)} ref={inputRef} value={field.value} onChange={onChange} />
    </FormItem>
  );
};

interface TextSearchInputProps extends FieldProps, Omit<SearchProps, toOmit>, CustomProps {}
export const TextSearchInput: React.FC<TextSearchInputProps> = props => {
  const { form, field, readOnly } = props;
  const { setFieldValue } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const value = valueFormatter(e.target.value, props.format);
    setFieldValue(field.name, value);
  };

  return (
    // @ts-ignore
    <FormItem {...props}>
      <Input.Search {...omitFormikProps(props)} value={field.value} onChange={onChange} />
    </FormItem>
  );
};

interface TextInputProps extends FieldProps, Omit<InputProps, toOmit>, CustomProps {}
export const TextInput: React.FC<TextInputProps> = props => {
  const { form, field, readOnly } = props;
  const { setFieldValue } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const value = valueFormatter(e.target.value, props.format);
    setFieldValue(field.name, value);
  };

  return (
    // @ts-ignore
    <FormItem {...props}>
      <Input {...omitFormikProps(props)} value={field.value} onChange={onChange} />
    </FormItem>
  );
};

const valueFormatter = (value: string, format: format): string => {
  if (!value) return value;
  switch (format) {
    case 'mobile':
      return normalizeMobile(value);
    case 'prefix':
      return normalizePrefix(value);
    case 'tel':
      return normalizePhone(value);
    case 'uppercase':
      return _.toUpper(value);
    case 'lowercase':
      return _.lowerCase(value);
    case 'capitalize':
      return _.capitalize(value);
    case 'camelcase':
      return _.camelcase(value);
    default:
      return value;
  }
};

export const normalizeMobile = (value: string): string => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 3) return onlyNums;
  if (onlyNums.length <= 7) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 11)}`;
};

export const normalizePrefix = (value: string): string => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 4) return onlyNums;
  return `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}`;
};

export const normalizePhone = (value: string): string => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 2) return onlyNums;
  if (onlyNums.length <= 6) return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
  return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(6, 10)}`;
};

export default TextInput;
