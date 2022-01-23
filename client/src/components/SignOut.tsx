import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOut } from '../state/action-creators';

const SignOut: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(signOut());
    history.push('/signin');
  });
  return <></>;
};

export default SignOut;
