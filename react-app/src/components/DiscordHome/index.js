import LogoutButton from "../auth/LogoutButton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './DiscordHome.css'

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
      <div className='home-banner-wrapper'>
        <h1>IMGINE A PLACE...</h1>
        <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
      </div>
      <div className='home-background-wrapper'>
        <img id='img-home-right' src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669260/discord_group_projo_assets/home-right_gxykcx.svg' alt='discord home bottom left'/>
        <img id='img-home-center' src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669376/discord_group_projo_assets/home-center_jgb22n.svg' alt='discord home center'/>
        <img id='img-home-left' src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669251/discord_group_projo_assets/home-left_r87yul.svg' alt='discord home bottom right'/>
      </div>
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
