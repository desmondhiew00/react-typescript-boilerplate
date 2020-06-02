/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Method } from 'axios';
import { Select, Empty } from 'antd';
import _ from 'lodash';
import { FieldProps } from 'formik';
import { SelectProps } from 'antd/lib/select';
import { apiCaller } from '@api';
import { LoadingDots } from '@components';
import FormItem from './FormItem';

const { Option } = Select;
const commonLabelKeys = ['name', 'title'];

export const SelectInput = forwardRef((props: SelectInput, ref) => {
  const { field, form } = props;
  const { setFieldValue } = form;
  const { valueKey, labelKey, extraOptions = [] } = props;
  const [fetching, setFetching] = useState(false);
  const [searching, setSearching] = useState(false);
  const [options, setOptions] = useState<object[] | string[]>(props.options || []);

  const limit = props.api?.limit || 0;
  const total = useRef(0);
  const offset = useRef(0);
  const hasMore = total.current > options.length;

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    getOptionsRequest();
  }, []);

  const findRecord = (value: OptionValue, option: any) => {
    let obj = _.find(options, (o: any) => _.toString(_.get(o, valueKey)) === _.toString(value));
    if (!obj) obj = options[option.key];
    return obj;
  };

  const getOptionsRequest = async ({
    search = false,
    loadMore = false
  }: { search?: boolean; loadMore?: boolean } = {}) => {
    const { api } = props;
    if (!api || fetching) return;
    const { customCaller, infiniteScroll } = api;

    if (loadMore && !infiniteScroll) return;
    if (loadMore && !hasMore) return;
    if (search) {
      setSearching(true);
    } else {
      setFetching(true);
    }

    let data: any[];
    try {
      if (customCaller) {
        data = await customCaller();
      } else {
        if (loadMore) offset.current += limit;
        if (search) offset.current = 0;
        const params = infiniteScroll ? { ...api.params, limit, offset: offset.current } : {};
        const res = await apiCaller[api.method](api.url, { params });
        data = _.get(res, `data.${api.rowsKey}`);
        total.current = _.get(res, `data.${api.totalKey}`);
        if (loadMore) data = _.concat(options, data);
      }
      setOptions(data);
      // eslint-disable-next-line no-empty
    } catch (e) {}

    if (search) {
      setSearching(false);
    } else {
      setFetching(false);
    }
  };

  const handleChange = (value: OptionValue, option: any) => {
    const multiple = props.mode === 'multiple';
    if (multiple && props.selectAll && _.includes(value, 'select-all-option')) {
      const newValue = _.map(options, valueKey);
      setFieldValue(field.name, newValue);
      if (props.onChange) props.onChange(value, option, multiple ? newValue : findRecord(value, option));
    } else {
      if (props.onChange) props.onChange(value, option, multiple ? value : findRecord(value, option));
      setFieldValue(field.name, value);
    }
  };

  const handleSelect = (value: OptionValue, option: any) => {
    if (props.onSelect) props.onSelect(value, option, findRecord(value, option));
  };

  const parseOptionValue = (option: any): OptionValue => {
    const { optionValueParser } = props;
    if (optionValueParser) return optionValueParser(option);
    if (_.isString(option)) return option;
    return _.get(option, valueKey);
  };

  const optionRenderer = (option: any, index: number): React.ReactNode => {
    const { optionRender } = props;
    if (optionRender) return optionRender(option, index);

    if (_.isString(option)) return option;
    let label: string = '';
    label = _.get(option, labelKey);
    if (!label) {
      _.map(commonLabelKeys, (commonKey: string) => {
        if (!label) label = _.get(option, commonKey);
      });
    }
    return label || `Failed to load label`;
  };

  return (
    <FormItem {..._.omit(props, selectInputProps)}>
      <Select
        mode={props.mode}
        loading={fetching || searching}
        value={field.value}
        notFoundContent={<Empty />}
        onChange={handleChange}
        onSelect={handleSelect}
        onPopupScroll={e => {
          e.persist();
          const { target } = e;
          // @ts-ignore
          if (target.scrollTop + target.offsetHeight === target.scrollHeight) getOptionsRequest({ loadMore: true });
        }}
        getPopupContainer={t => t}
      >
        {props.selectAll && props.mode === 'multiple' && <Option value="select-all-option">Select All</Option>}
        {_.map(_.concat(options, extraOptions), (option: object, index: number) => (
          <Option
            key={_.get(option, valueKey) || index}
            value={parseOptionValue(option)}
            className={props.optionClassName}
            disabled={props.optionDisabled ? props.optionDisabled(option, index) : false}
          >
            {optionRenderer(option, index)}
          </Option>
        ))}

        {hasMore && (
          <Option className="w-full text-center" value="select-fetching-value" disabled>
            <LoadingDots className="c-link">{fetching ? 'Loading' : ''}</LoadingDots>
          </Option>
        )}
      </Select>
    </FormItem>
  );
});

SelectInput.defaultProps = {
  selectAll: true,
  valueKey: 'value',
  labelKey: 'label'
};
export default SelectInput;

declare type OptionValue = string | number;
declare type OptionType = object[] | string[];
type toOmit = 'options' | 'valueKey' | 'labelKey' | 'onChange' | 'onSelect' | 'selectAll';

interface SelectInput extends FieldProps, Omit<SelectProps<any>, toOmit> {
  options: OptionType;
  extraOptions: OptionType;
  valueKey?: string;
  labelKey?: string;
  selectAll?: boolean;
  optionValueParser?(option: any): OptionValue;
  optionRender?(option: any, index: number): React.ReactNode;
  optionClassName: string;
  optionDisabled?(option: any, index: number): boolean;
  api?: {
    infiniteScroll?: boolean;
    method: Method;
    url: string;
    params?: any;
    limit?: number;
    totalKey: string;
    rowsKey: string;
    customCaller?: () => Promise<any[]>;
  };
  onChange: (value: OptionValue, option: any, record: any) => void;
  onSelect: (value: OptionValue, option: any, record: any) => void;
}

const selectInputProps = [
  'options',
  'extraOptions',
  'valueKey',
  'labelKey',
  'selectAll',
  'optionValueParser',
  'optionRender',
  'optionClassName',
  'optionDisabled',
  'api',
  'onChange',
  'onSelect'
];
