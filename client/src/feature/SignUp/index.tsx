import { Container } from 'react-bootstrap';
import { INewUser } from '../../types';
import SignUpForm from './SignUpForm';
import { useCreateUserMutation } from './signupApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import errorNotification from '../../utils/errorNotification';
import { message } from '../../utils/notificationMessages';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (newUserData: INewUser) => {
    try {
      await createUser(newUserData).unwrap();
      toast.success(message.SUCCESS.CREATE_USER);

      navigate('/signin');
    } catch (error) {
      errorNotification(error, message.FAILED.CREATE_USER);
    }
  };

  // if (user.authentication) {
  //   return <Redirect to="/" />;
  // }

  return (
    <Container className="content-container" style={{ width: '75%' }}>
      <SignUpForm onSubmit={onSubmit} />
    </Container>
  );
};

export default SignUp;
