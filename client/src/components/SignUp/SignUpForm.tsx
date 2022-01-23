import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { SubmitButton, TextField } from '../../utils';
import { INewUserValues } from '../../types';

interface ISignUpFormProps {
  onSubmit: (values: INewUserValues) => void;
}

const INITIAL_VALUES = {
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .email('Username should be in email')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 character long')
    .max(20, 'Password should be less than 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password don't match")
    .required('Password confirmation is required'),
});

const SignUpForm: React.FC<ISignUpFormProps> = ({ onSubmit }) => {
  return (
    <div>
      <h1 className="mb-5">Signup</h1>

      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        <Form>
          <Field
            id="name"
            label="Name"
            name="name"
            placeholder="Name"
            component={TextField}
          />

          <Field
            id="username"
            label="Username (Email)"
            name="username"
            placeholder="Username"
            component={TextField}
          />

          <Field
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            component={TextField}
          />

          <Field
            id="confirmPassword"
            label="Password confirmation"
            name="confirmPassword"
            type="password"
            placeholder="Password"
            component={TextField}
          />

          <SubmitButton id="signup-btn" name="Sign up" />
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
