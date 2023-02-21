import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxToolkit';
import { ILogin } from '../../../types';
import errorNotification from '../../../utils/errorNotification';
import { message } from '../../../utils/notificationMessages';
import { useLoginMutation } from '../authApiSlice';
import { setCredentials } from '../authSlice';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (credentials: ILogin) => {
    try {
      const userData = await login(credentials).unwrap();

      dispatch(setCredentials({ ...userData }));
      navigate('/');
    } catch (error) {
      errorNotification(error, message.FAILED.LOGIN);
    }
  };

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      {isLoading ? <h1>Loading ...</h1> : <LoginForm onSubmit={handleSubmit} />}
    </Container>
  );
};

export default Login;
