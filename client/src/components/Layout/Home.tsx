import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../feature/auth/authSlice';
import { useAppSelector } from '../../hooks/reduxToolkit';

const Home = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Container className="content-container text-center">
      <div className="display-2  font-weight-bold">Welcome to Todo App.</div>
      {user ? (
        <>
          <div className="display-6 font-weight-bold mb-4">{user}</div>
          <br />
          <br />
          <Link to="/tasks">Goto task</Link>
        </>
      ) : (
        <div className="display-6">(Please sign in or sign up)</div>
      )}
      <br />
    </Container>
  );
};

export default Home;
