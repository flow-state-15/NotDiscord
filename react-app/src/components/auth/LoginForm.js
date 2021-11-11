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
    <div>
      {demo && user ? <Redirect to="/channels/@me" /> : null}
      <div className='login-form-wrapper'>
        <h2>Welcome back!</h2>
        <span>We're so excited to see you again!</span>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email">EMAIL</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
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
          </div>
        </form>
        <button onClick={() => dispatchDemoLogin()}>Demo User</button>
        <div>
          Need an account?
          <Link to="/sign-up">
              Register
          </Link>
        </div>
        <Link to="/">Return to Discord</Link>
      </div>
    </div>
  );
};

export default LoginForm;
