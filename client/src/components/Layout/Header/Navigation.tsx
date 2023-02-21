import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Person, PersonPlus, PersonDash } from 'react-bootstrap-icons';
import { useAppSelector } from '../../../hooks/reduxToolkit';
import { selectCurrentUser } from '../../../feature/auth/authSlice';

const Navigation: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Navbar bg="primary" variant="dark" className="header-navbar">
      <Container>
        <Navbar.Brand
          id="app-name"
          as={Link}
          to="/"
          className="font-weight-bold"
        >
          Todo App
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end right-side-link">
          {user ? (
            <>
              <Nav className="me-auto">
                <Nav.Link id="tasks-link" as={Link} to="/tasks" title="Tasks">
                  Tasks
                </Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Text className="px-3">
                  <div>Welcome</div>
                  <div className="font-weight-bold">{user}</div>
                </Navbar.Text>
                <Nav.Link
                  id="signout-link"
                  as={Link}
                  to="/signout"
                  title="Sign out"
                >
                  <PersonDash size={32} />
                  <div className="link-description">Sign out</div>
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav>
                <Nav.Link
                  className="px-3"
                  id="signin-link"
                  as={Link}
                  to="/signin"
                  title="Sign in"
                >
                  <Person size={32} />
                  <div className="link-description">Sign in</div>
                </Nav.Link>
                <Nav.Link
                  id="signup-link"
                  as={Link}
                  to="/signup"
                  title="Sign up"
                >
                  <PersonPlus size={32} />
                  <div className="link-description">Sign up</div>
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
