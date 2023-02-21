import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { ILogin } from '../../../types';
import { SubmitButton, TextField } from '../../../utils/formHelper';

interface ILoginFormProps {
  onSubmit: (values: ILogin) => void;
}

const INITIAL_VALUES = {
  username: '',
  password: '',
};

const VALIDATION_SCHEMA = Yup.object().shape({
  username: Yup.string()
    // .email('Username should be in email format')
    .required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }) => {
  return (
    <div>
      <h1 className="mb-5">Sign In</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {() => (
          <FormikForm>
            <Field
              id="username"
              label="Username (Email)"
              placeholder="Username"
              name="username"
              component={TextField}
            />

            <Field
              id="password"
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              component={TextField}
            />

            <SubmitButton id="signin-btn" name="Sign in" />
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
