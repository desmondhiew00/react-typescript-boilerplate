import React, { useState } from 'react';
import { Button } from 'antd';
import { Formik, Form, Field } from 'formik';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { TextInput } from '@components/form';
import { required, email, composeValidators, maxLength } from '@utils/form-validator.utils';
import { requestLogin } from '@actions/auth.actions';
import { printErrorMessage } from '@utils';

interface Props {
  onLinkClicked: () => void;
}
interface FormProps {
  email: string;
  password: string;
}
export const LoginForm: React.FC<Props> = props => {
  const { onLinkClicked } = props;
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (formValues: FormProps) => {
    setSubmitting(true);
    try {
      await requestLogin(formValues)();
    } catch (e) {
      printErrorMessage(e);
    }
    setSubmitting(false);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={{ email: '', password: '' }}>
      <Form>
        <Field
          name="email"
          component={TextInput}
          placeholder="Email"
          prefix={<UserOutlined />}
          validate={composeValidators(required, email)}
        />
        <Field
          name="password"
          component={TextInput}
          placeholder="Password"
          type="password"
          prefix={<LockOutlined />}
          validate={composeValidators(required, maxLength(100))}
        />

        <Button className="link-btn" type="link" onClick={onLinkClicked}>
          Forgot Password
        </Button>

        <Button type="primary" block htmlType="submit" loading={submitting}>
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
