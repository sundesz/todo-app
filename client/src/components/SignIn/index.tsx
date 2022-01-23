import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../state/action-creators';
import { ISignInValues } from '../../types';
import SignInForm from './SignInForm';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values: ISignInValues) => {
    dispatch(signIn(values));
    history.push('/');
  };

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      <SignInForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignIn;
