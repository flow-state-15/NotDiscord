import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(login("DougD@demo.dome", "DemoDome"));
    setDemo(true);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/channels/@me" />;
  }

  return (
    <div className='login-form-wrapper'>
      {demo && user ? <Redirect to="/channels/@me" /> : null}
      <div>
        <h3 style={{color: "white"}}>Welcome back!</h3>
        <form className='login-form-form' onSubmit={onLogin}>
          <span>We're so excited to see you again!</span>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='login-form-components'>
            <label htmlFor="email">EMAIL</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-form-components'>
            <label htmlFor="password">PASSWORD</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit" onClick={() => console.log("LOGIN CLICKED")}>
              Login
            </button>
            <button onClick={() => dispatchDemoLogin()}>Demo User</button>
          </div>
        </form>
        <div style={{color: "#5E6168"}}>
          Need an account?
          <Link className='login-links' to="/sign-up">
              Register
          </Link>
        </div>
        <Link className='login-links' to="/">Return to Discord</Link>
      </div>
    </div>
  );
};

export default LoginForm;
