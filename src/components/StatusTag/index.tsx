/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import React from 'react';
import { Tag } from 'antd';

export const colors = {
  magenta: 'magenta',
  red: 'red',
  volcano: 'volcano',
  orange: 'orange',
  gold: 'gold',
  lime: 'lime',
  green: 'green',
  cyan: 'cyan',
  blue: 'blue',
  geekblue: 'geekblue',
  purple: 'purple',
  grey: undefined
};

const getColor = (status: string | undefined | null | boolean): string | undefined => {
  switch (_.toLower(status)) {
    case 'true':
      return colors.green;
    case 'false':
      return colors.red;
    case 'pending':
      return colors.orange;
    case 'success':
      return colors.green;
    case 'paid':
      return colors.green;
    case 'active':
      return colors.green;
    case 'inactive':
      return colors.red;
    case 'failed':
      return colors.red;
    case 'fail':
      return colors.red;
    case 'cancelled':
      return colors.red;
    case 'cancel':
      return colors.red;
    case 'online':
      return colors.green;
    case 'offline':
      return colors.grey;
    case 'rejected':
      return colors.red;
    case 'approved':
      return colors.green;
    default:
      return colors.orange;
  }
};

const getColorFromConstants = val => constant => {
  let color = colors.orange;
  if (_.isObject(constant)) {
    _.forOwn(constant, (obj, key) => {
      let value = _.get(obj, 'value', null);
      const label = _.get(obj, 'label', null);
      if (!value) value = key;

      if (_.isEqual(value, _.toLower(val))) {
        color = _.get(obj, 'color', color);
      } else if (_.isEqual(_.toLower(label), _.toLower(val))) {
        color = _.get(obj, 'color', color);
      }
    });
  }
  return color;
};

const StatusTag = ({ active, status, color, constant, className = 'mr-0', style }: StatusTag) => {
  let displayColor: string | undefined | null = color;
  let text = status;
  if (!text) text = active ? 'Active' : 'Inactive';
  if (displayColor === undefined && constant) displayColor = getColorFromConstants(status)(constant);
  if (displayColor === undefined && !constant) displayColor = getColor(status || active);

  return (
    <Tag className={className} style={style} color={displayColor}>
      {text}
    </Tag>
  );
};

interface StatusTag {
  active?: boolean;
  status?: string;
  color?: string;
  constant?: object;
  className?: string;
  style?: React.CSSProperties;
}
export { StatusTag };
export default StatusTag;
