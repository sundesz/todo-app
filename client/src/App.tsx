import React from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import Tasks from './components/Tasks';
import { refetchToken } from './state/action-creators';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(refetchToken());
  }, []);

  return (
    <Container>
      <Navigation />
      <Notification />
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Container>
  );
};

export default App;
