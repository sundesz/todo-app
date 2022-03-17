import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../state';
import { Person, PersonPlus, PersonDash } from 'react-bootstrap-icons';

const Navigation: React.FC = (): JSX.Element => {
  const user = useSelector((state: AppState) => state.user);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="header-navbar">
        <Navbar.Brand
          id="app-name"
          as={Link}
          to="/"
          className="font-weight-bold"
        >
          Todo App
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user.authentication ? (
            <>
              <Navbar.Text>Welcome: {user.user}</Navbar.Text>
              <Nav.Link
                id="signout-link"
                as={Link}
                to="/signout"
                title="Sign out"
              >
                <PersonDash size={32} />
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link id="signin-link" as={Link} to="/signin" title="Sign in">
                <Person size={32} />
              </Nav.Link>
              <Nav.Link id="signup-link" as={Link} to="/signup" title="Sign up">
                <PersonPlus size={32} />
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
