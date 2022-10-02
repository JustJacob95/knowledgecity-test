import React, { useEffect } from 'react';
import Login from './components/Login';
import jwtService from './services/jwtService';
import UserList from './components/UserList';
import { authLogoutAction } from './store/redux/auth/slice';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './styles/general.css';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";


function App() {
  const dispatch = useDispatch();
  const auth  = useSelector((state) => state.auth);
  const userIsLoggedIn = Object.keys(auth.user).length > 0;
  jwtService.on('onAutoLogout', () => {
    dispatch(authLogoutAction());
  });
  jwtService.on('onAutoLogin', () => {

  });
  jwtService.on('onNoAccessToken', () => {
  });
  jwtService.init();
  //todo use useefferct, when remove listener after unmount
  window.addEventListener("beforeunload", function(event) {
      if (localStorage.getItem('remember_me') === null) {
        localStorage.removeItem('user');
      }
  });
  return (
    <>
      <Routes>
        {userIsLoggedIn && <Route path='*' element={<>Page not found</>} />}
        {userIsLoggedIn && <Route exact path="/" element={<UserList />} />}
        {userIsLoggedIn === false && <Route path="/login" element={<Login />} />}
        {userIsLoggedIn === false && <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />}
        {userIsLoggedIn && <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
