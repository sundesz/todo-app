import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signOut } from '../state/action-creators';

const SignOut: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(signOut());
  });

  return <Redirect to="/signin" />;
};

export default SignOut;
