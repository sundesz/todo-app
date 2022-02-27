import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../state';
import { createUser } from '../../state/action-creators';
import { INewUserValues } from '../../types';
import SignUpForm from './SignUpForm';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  const onSubmit = async (values: INewUserValues) => {
    dispatch(createUser(values));
  };

  if (user.authentication) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignUp;
