import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { signIn } from '../../state/action-creators';
import { IAppState } from '../../state/action-types';
import { ISignInValues } from '../../types';
import SignInForm from './SignInForm';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: IAppState) => state.user);

  const onSubmit = (values: ISignInValues) => {
    dispatch(signIn(values));
    history.push('/');
  };

  if (user.authentication) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      <SignInForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignIn;
