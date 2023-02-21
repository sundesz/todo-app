import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxToolkit';

import { selectCurrentToken } from './authSlice';

const RequireNoAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireNoAuth;
