/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, Tooltip } from 'antd';
import { FieldProps } from 'formik';
import _ from 'lodash';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { getFormLayout, LayoutType } from './FormLayout';

const Label: React.FC<Partial<LabelProps>> = prop => {
  const { label, hint } = prop;
  if (!label) return null;
  return (
    <span>
      {label}
      {hint && (
        <Tooltip title={hint} className="ml-1">
          <QuestionCircleOutlined style={{ color: '#1890ff' }} />
        </Tooltip>
      )}
    </span>
  );
};

const FormItem: React.FC<Partial<IFormItemProps>> = props => {
  const { label, children, colon } = props;
  const { formItemStyle, formItemClassName, hint, formLayout = 'default' } = props; // Custom props
  const { form, field } = props; // Formik field props
  // @ts-ignore
  const { touched, errors, submitCount } = form;

  const layout = getFormLayout(formLayout);

  const validateMessage =
    (_.get(touched, field?.name) && _.get(errors, field?.name)) || (submitCount > 0 && _.get(errors, field?.name));

  const validateStatus =
    (_.get(touched, field?.name) && _.get(errors, field?.name) && 'error') ||
    (submitCount > 0 && _.get(errors, field?.name) && 'error');

  return (
    <Form.Item
      {...layout}
      {...props}
      style={formItemStyle}
      className={formItemClassName}
      hasFeedback
      label={Label({ label, hint })}
      colon={label ? colon : false}
      help={validateMessage || undefined}
      validateStatus={validateStatus || undefined}
      wrapperCol={!label ? { span: 24 } : layout.wrapperCol}
    >
      {children}
    </Form.Item>
  );
};

const omitFormikProps = props => {
  const fields = ['field', 'form', 'meta'];
  return _.omit(props, fields);
};

interface LabelProps {
  label: string;
  hint: string;
}

interface IFormItemProps extends FieldProps, FormItemProps {
  formItemStyle: React.CSSProperties;
  formItemClassName: string;
  label: string;
  hint: string;
  formLayout: LayoutType;
}

export { FormItem, omitFormikProps };
export default FormItem;
