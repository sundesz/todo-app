import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IAppState } from '../state/action-types';

const Navigation: React.FC = (): JSX.Element => {
  const user = useSelector((state: IAppState) => state.user);

  return (
    <>
      <Navbar bg="info" variant="dark" className="header-navbar">
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
              <Nav.Link id="signout-link" as={Link} to="/signout">
                Sign out
              </Nav.Link>
              <Navbar.Text>Signed in as: {user.user}</Navbar.Text>
            </>
          ) : (
            <>
              <Nav.Link id="signin-link" as={Link} to="/signin">
                Sign in
              </Nav.Link>
              <Nav.Link id="signup-link" as={Link} to="/signup">
                Sign up
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
