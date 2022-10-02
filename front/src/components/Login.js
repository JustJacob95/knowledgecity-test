import React from 'react';
import Logo from '../images/logo.svg';
import {useDispatch, useSelector} from "react-redux";
import { authLoginAction} from '../store/redux/auth/slice';
import UserImage from '../images/user.svg';
import PwdImage from '../images/password.svg';
import '../styles/login.css'


function Login() {
  const dispatch = useDispatch();
  const auth  = useSelector((state) => state.auth);


  const submitForm = (e) => {
    e.preventDefault();
    if (!auth.loading) {
      dispatch(authLoginAction(Object.fromEntries(new FormData(e.target).entries())));
    }
  };


  return(
    <div className="login-page">
      <img className="logo" src={Logo} alt="Logo"/>
      <div className="text-before-form">
        <h3>Welcome to the Learning Management System</h3>
        <p>Please log in to continue</p>
      </div>
      <form onSubmit={submitForm} action="">
        <div className="form-input">
          <img src={UserImage} alt=""/>
          <input type="text" required name="username" placeholder="Username"/>
        </div>
        <div className="form-input">
          <img src={PwdImage} alt=""/>
          <input type="password" required name="password" placeholder="Password"/>
        </div>
        <div className="input-form checkbox">
          <input type="checkbox" name="remember_me" id="remember_me"/>
          <label htmlFor="remember_me">Remember me</label>
        </div>
        <button className="submit">
          {auth.loading === false && <>
            <div className="text">
              Log in
            </div>
            <div className="icon">
              >
            </div>
          </>}
          {auth.loading === true && <div className="loader"></div>}
        </button>
      </form>
    </div>
  )
}

export default Login;