import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Page404 from './components/Layout/Page404';
import Home from './components/Layout/Home';
import Login from './feature/auth/Login/Login';
import SignUp from './feature/SignUp';
import Logout from './feature/auth/Logout';
import RequireAuth from './feature/auth/RequireAuth';
import TaskList from './feature/Tasks/TaskList';
import RequireNoAuth from './feature/auth/RequireNoAuth';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        style={{ width: '600px' }}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<RequireNoAuth />}>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/signout" element={<Logout />} />
            <Route path="/tasks" element={<TaskList />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
