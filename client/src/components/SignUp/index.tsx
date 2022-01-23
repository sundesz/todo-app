import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../state/action-creators';
import { IAppState } from '../../state/action-types';
import { INewUserValues } from '../../types';
import Tasks from '../Tasks';
import SignUpForm from './SignUpForm';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IAppState) => state.user);

  const onSubmit = async (values: INewUserValues) => {
    dispatch(createUser(values));
  };

  if (user.authentication) {
    return <Tasks />;
  }

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignUp;
