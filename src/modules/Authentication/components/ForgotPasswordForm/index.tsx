import React, { useState } from 'react';
import { Button, Result } from 'antd';
import { Formik, Form, Field } from 'formik';
import { UserOutlined } from '@ant-design/icons';
import { TextInput } from '@components/form';
import { required, email, composeValidators } from '@utils/form-validator.utils';

interface Props {
  onLinkClicked: () => void;
}
export const ForgotPasswordForm: React.FC<Props> = props => {
  const { onLinkClicked } = props;
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async formValues => {
    setSubmitting(true);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <Result
        style={{ padding: 0 }}
        status="success"
        title="Successfully sent."
        subTitle="A reset password link has been sent to you via email. You can follow that link and select a new password."
        extra={[
          <Button key="gotosignin" onClick={onLinkClicked}>
            Go to sign in
          </Button>
        ]}
      />
    );

  return (
    <Formik onSubmit={handleSubmit} initialValues={{}}>
      <Form>
        <span className="font-bold">Forgot password ?</span>
        <p>Please enter your email address to request a password reset.</p>
        <Field
          name="email"
          component={TextInput}
          placeholder="Email"
          prefix={<UserOutlined />}
          validate={composeValidators(required, email)}
        />
        <Button className="link-btn" type="link" onClick={onLinkClicked}>
          Sign In
        </Button>

        <Button type="primary" block htmlType="submit" loading={submitting}>
          Reset Password
        </Button>
      </Form>
    </Formik>
  );
};

export default ForgotPasswordForm;
