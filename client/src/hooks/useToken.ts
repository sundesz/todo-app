import { useSelector } from 'react-redux';
import { IAppState } from '../state/action-types';

const useToken = () => {
  const user = useSelector((state: IAppState) => state.user);

  return {
    token: user.token,
  };
};

export default useToken;
