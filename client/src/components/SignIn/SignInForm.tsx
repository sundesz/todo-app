import React from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { ISignInValues } from '../../types';
import { SubmitButton, TextField } from '../../utils';

interface ISignInFormProps {
  onSubmit: (values: ISignInValues) => void;
}

const INITIAL_VALUES = {
  username: '',
  password: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string()
    .email('Username should be in email format')
    .required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const SignInForm: React.FC<ISignInFormProps> = ({ onSubmit }) => {
  return (
    <div>
      <h1 className="mb-5">Signin</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {() => (
          <FormikForm>
            <Field
              label="Username (Email)"
              placeholder="Username"
              name="username"
              component={TextField}
            />

            <Field
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              component={TextField}
            />

            <SubmitButton name="Sign in" />
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
