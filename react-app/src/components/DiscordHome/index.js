import LogoutButton from "../auth/LogoutButton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";

export default function DiscordHome() {
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(login("DougD@demo.dome", "DemoDome"));
    setDemo(true);
  };

  return (
    <div>
      <h1>Discord Splash Page</h1>
      <button onClick={dispatchDemoLogin}>Demo User</button>
      {demo && user ? <Redirect to="/channels/@me" /> : null}
      {user ? (
        <LogoutButton />
      ) : (
        <div>
          <div>
            <Link to="/login" exact={true} activeClassName="active">
              Login
            </Link>
          </div>
          <div>
            <Link to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
