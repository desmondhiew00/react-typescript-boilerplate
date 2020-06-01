import React, { useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Result, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import _ from 'lodash';
import * as API from '@api/auth.api';
import * as validator from '@utils/form-validator.utils';
import { TextInput } from '@components/form';
import { printErrorMessage } from '@utils';

const ResetPassword = (props: RouteComponentProps) => {
  const query = queryString.parse(_.get(props, 'location.search'));
  const token = _.get(query, 'token');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({ email: 'admin@test.com' });

  const invalidUrl = () => props.history.push('/404', { from: 'reset-password' });
  if (!token) invalidUrl();

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const res = await API.verifyForgotPasswordUrl(token);
      setUser(_.get(res, 'data.payload', {}));
      setVerified(true);
    } catch (e) {
      invalidUrl();
    }
  };

  const handleSubmit = async formValues => {
    setSubmitting(true);
    try {
      await API.forgotPassword(formValues);
      setSubmitted(true);
    } catch (e) {
      printErrorMessage(e);
    }
    setSubmitting(false);
  };

  if (!verified) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <LoadingOutlined />
      </div>
    );
  }

  if (submitted) {
    return (
      <Result
        style={{ padding: 0 }}
        status="success"
        title="Successfully Reset Password"
        subTitle="Your new password was successfully updated. You may proceed to sign in now."
        extra={[
          <Button key="gotosignin" onClick={() => props.history.push('/login')}>
            Go to sign in
          </Button>
        ]}
      />
    );
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={{ newPassword: '', confirmPassword: '' }}>
      <Form>
        <span className="font-bold">Reset Password</span>
        <p>
          You are about to set a new password for <span className="font-semibold">{_.get(user, 'email', '')}</span>
        </p>

        <Field
          required
          name="newPassword"
          placeholder="New Password"
          component={TextInput}
          type="password"
          validate={validator.required}
        />
        <Field
          required
          name="confirmPassword"
          placeholder="Confirm Password"
          component={TextInput}
          type="password"
          validate={validator.required}
        />

        <Button type="primary" block htmlType="submit" loading={submitting} disabled={submitting}>
          Save Password
        </Button>
      </Form>
    </Formik>
  );
};

export const ResetPasswordForm = withRouter(ResetPassword);
export default ResetPasswordForm;
