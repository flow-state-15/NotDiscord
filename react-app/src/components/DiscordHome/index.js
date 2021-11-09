import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DiscordHome() {
  const user = useSelector((state) => state.session.user);

    

  return (
    <main>
      <h1>Discord Splash Page</h1>
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
    </main>
  );
}
