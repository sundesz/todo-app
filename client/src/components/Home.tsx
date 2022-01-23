import React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { IAppState } from '../state/action-types';
import Tasks from './Tasks';

const Home = () => {
  const user = useSelector((state: IAppState) => state.user);

  if (user.authentication) {
    return <Tasks />;
  }

  return (
    <Container className="content-container">
      <div className="display-2 text-center font-weight-bold">
        Welcome to Todo App.
      </div>
      <div className="display-6 text-center">(Please sign in or sign up)</div>
      <br />
    </Container>
  );
};

export default Home;
