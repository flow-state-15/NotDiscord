import LogoutButton from "../auth/LogoutButton";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "./DiscordHome.css";

export default function DiscordHome() {
  const history = useHistory();
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(login("DougD@demo.dome", "DemoDome"));
    setDemo(true);
  };

  function loginClick () {
    history.push('/login')
  }

  function signupClick () {
    history.push('/sign-up')
  }

  return (
    <div className="daClassName">
      <nav className="home-nav-bar">
        <div className="logo-container">
          <svg width={124} height={34} className="logo-svg">
            <g fill="white">
              <path d="M26.002 6.953c-2-.915-4.123-1.581-6.34-1.953-.279.48-.589 1.131-.806 1.643a24.233 24.233 0 00-7.022 0A20.16 20.16 0 0011.028 5a24.937 24.937 0 00-6.341 1.953C.673 12.873-.413 18.655.13 24.358c2.666 1.938 5.239 3.116 7.767 3.89a18.896 18.896 0 001.658-2.68 16.264 16.264 0 01-2.62-1.256c.218-.155.435-.325.636-.496 5.053 2.31 10.526 2.31 15.517 0 .217.17.418.341.635.496-.837.496-1.705.915-2.62 1.255.481.946 1.04 1.845 1.66 2.682a25.694 25.694 0 007.766-3.89c.666-6.603-1.056-12.338-4.527-17.406zM10.252 20.84c-1.518 0-2.758-1.38-2.758-3.069s1.209-3.069 2.759-3.069c1.534 0 2.79 1.38 2.758 3.07 0 1.689-1.224 3.068-2.758 3.068zm10.185 0c-1.519 0-2.76-1.38-2.76-3.069s1.21-3.069 2.76-3.069c1.535 0 2.79 1.38 2.76 3.07 0 1.689-1.21 3.068-2.76 3.068zM41.27 9.866h6.588c1.581 0 2.93.248 4.03.744s1.922 1.178 2.465 2.062c.542.883.821 1.89.821 3.037 0 1.116-.279 2.124-.852 3.038-.574.9-1.442 1.628-2.604 2.155-1.163.527-2.604.79-4.325.79H41.27V9.866zm6.046 8.82c1.07 0 1.89-.264 2.464-.807.574-.527.868-1.27.868-2.185 0-.853-.263-1.535-.775-2.046-.511-.511-1.286-.775-2.325-.775h-2.06v5.812h1.828zM65.436 21.677c-.914-.232-1.736-.573-2.464-1.038v-2.805c.558.433 1.286.774 2.216 1.053.93.28 1.83.419 2.697.419.403 0 .713-.047.914-.155.202-.108.31-.232.31-.387 0-.171-.061-.31-.17-.419-.108-.108-.325-.201-.651-.294l-2.03-.45c-1.163-.263-1.984-.65-2.48-1.116-.496-.465-.729-1.1-.729-1.875 0-.651.217-1.225.636-1.705.434-.48 1.038-.853 1.829-1.116.79-.264 1.705-.403 2.774-.403.946 0 1.813.093 2.604.31.79.201 1.441.465 1.953.775v2.65a7.522 7.522 0 00-1.83-.744 8.265 8.265 0 00-2.138-.279c-1.054 0-1.58.186-1.58.543 0 .17.077.294.247.387.17.093.465.17.899.264l1.69.31c1.1.186 1.921.527 2.464 1.007.542.48.806 1.178.806 2.123 0 1.024-.45 1.845-1.349 2.434-.899.604-2.17.899-3.813.899-.96-.031-1.89-.155-2.805-.388zM77.59 21.321c-.962-.48-1.706-1.116-2.186-1.922-.496-.806-.729-1.72-.729-2.743 0-1.007.248-1.922.76-2.712.511-.806 1.255-1.426 2.232-1.891.976-.45 2.154-.682 3.518-.682 1.69 0 3.084.356 4.2 1.07v3.084a4.941 4.941 0 00-1.38-.651 5.402 5.402 0 00-1.673-.248c-1.054 0-1.86.186-2.464.573-.59.388-.884.884-.884 1.504 0 .604.279 1.1.868 1.488.573.387 1.41.588 2.495.588.558 0 1.116-.077 1.659-.248.542-.17 1.023-.356 1.41-.604v2.991c-1.24.744-2.681 1.116-4.309 1.116-1.379 0-2.541-.248-3.518-.713zM89.804 21.321c-.976-.48-1.72-1.116-2.232-1.937a5.106 5.106 0 01-.775-2.759c0-1.007.264-1.922.775-2.712.512-.79 1.256-1.41 2.217-1.86.96-.45 2.123-.682 3.457-.682 1.333 0 2.496.217 3.457.682.96.45 1.705 1.07 2.216 1.86.512.79.76 1.69.76 2.712 0 1.008-.248 1.937-.76 2.759-.511.821-1.24 1.472-2.216 1.937-.977.465-2.124.713-3.457.713-1.319 0-2.465-.248-3.442-.713zm5.132-2.991c.403-.403.62-.961.62-1.627 0-.682-.202-1.21-.62-1.612-.419-.403-.977-.605-1.674-.605-.728 0-1.288.202-1.707.605-.403.403-.62.93-.62 1.612 0 .681.202 1.224.62 1.627.419.418.978.62 1.707.62.697-.016 1.27-.217 1.674-.62zM110.048 11.99v3.643c-.434-.28-.992-.419-1.674-.419-.899 0-1.597.279-2.077.821-.481.543-.729 1.395-.729 2.542v3.1h-4.138V11.82h4.061v3.146c.217-1.147.589-2 1.085-2.542.496-.542 1.147-.837 1.937-.837.589 0 1.101.14 1.535.403zM124 9.526v12.166h-4.138v-2.216c-.357.837-.884 1.473-1.597 1.907-.714.434-1.598.65-2.652.65-.93 0-1.751-.232-2.449-.681-.697-.45-1.239-1.085-1.611-1.876-.372-.806-.558-1.705-.558-2.697-.016-1.038.186-1.968.604-2.79a4.637 4.637 0 011.736-1.921c.744-.466 1.596-.698 2.557-.698 1.969 0 3.288.853 3.97 2.573V9.526H124zm-4.758 8.726c.418-.403.635-.946.635-1.597 0-.635-.201-1.147-.62-1.534-.418-.388-.976-.59-1.675-.59-.698 0-1.256.202-1.674.605-.419.403-.62.915-.62 1.566 0 .65.201 1.162.62 1.565.418.403.961.605 1.658.605.699 0 1.257-.202 1.676-.62zM58.989 12.41c1.188 0 2.154-.868 2.154-1.938 0-1.07-.966-1.938-2.154-1.938-1.19 0-2.155.868-2.155 1.938 0 1.07.964 1.937 2.154 1.937zM61.143 13.741c-1.318.573-2.96.589-4.309 0v7.951h4.309v-7.951z" />
            </g>
          </svg>
        </div>
        <div className='nav-button-wrap'>
          <button className='nav-bar-buttons' onClick={dispatchDemoLogin}>Demo User</button>
          {demo && user ? <Redirect to="/channels/@me" /> : null}
          {user ? (
            <LogoutButton />
          ) : (
            <div className='nav-button-wrap'>
              <div>
                <button className='nav-bar-buttons' onClick={() => loginClick()} exact={true} activeClassName="active">
                  Login
                </button>
              </div>
              <div>
                <button className='nav-bar-buttons' onClick={() => signupClick()} exact={true} activeClassName="active">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="home-background-wrapper">
        <div className="home-banner-wrapper">
          {/* <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636737023/discord_group_projo_assets/imgaine-a-place-h1_qulbqt.png' alt='imagine a place h1' /> */}
          <h1>IMAGINE A PLACE...</h1>
          <div>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </div>
        </div>
        <img
          id="img-home-right"
          src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669260/discord_group_projo_assets/home-right_gxykcx.svg"
          alt="discord home bottom left"
        />
        <div id="img-home-center">
          <img
            src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669376/discord_group_projo_assets/home-center_jgb22n.svg"
            alt="discord home center"
          />
        </div>
        <img
          id="img-home-left"
          src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636669251/discord_group_projo_assets/home-left_r87yul.svg"
          alt="discord home bottom right"
        />
      </div>
      <div className="home-tiles-wrapper">
        <div className='home-tile'>
          <div classname="home-tile-img-container">
              <img src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636734889/discord_group_projo_assets/home-tile-img-1_ojbvsc.svg" alt="home-tile-img" />
          </div>
          <div className="home-tile-text-container">
            <div className="home-tile-text">
              <h1>
              Create an<br />invite-only<br />place where you<br />belong
              </h1>
              <p>
              Discord servers are organized into topic-based channels where youcan collaborate, share, and just talk about your day without clogging up a group chat.
              </p>
            </div>
          </div>
        </div>
        <div className='home-tile'>
          <div className="home-tile-text-container home-text-container-v2">
            <div className="home-tile-text">
              <h1>
              Where hanging out is easy
              </h1>
              <p>
              Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
              </p>
            </div>
          </div>
          <div classname="home-tile-img-container v2">
              <img src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636737350/discord_group_projo_assets/home-tile-img-2_pwfuon.svg" alt='home tile img 2'/>
          </div>
        </div>
        <div className='home-tile'>
          <div classname="home-tile-img-container v2">
              <img src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636737987/discord_group_projo_assets/home-tile-img-3_xvxtxb.svg" alt='home tile img 3'/>
          </div>
          <div className="home-tile-text-container">
            <div className="home-tile-text">
              <h1>
              From few to a fandom
              </h1>
              <p>
              Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
              </p>
            </div>
          </div>
        </div>
        <div className="home-tile-last">
            <div className="home-tile-last-sparkles">
              <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636738671/discord_group_projo_assets/home-sparkles_xewoyf.svg' alt="home-sparkles"/>
              <h1>Ready to start your journey?</h1>
            </div>
            <div className="home-tile-last-button">
              <Link to='./channels/@me'>
                <button className="home-buttons">
                  Open Discord
                </button>
              </Link>
            </div>
        </div>
        <footer>
          <h1>!Discord</h1>
          <h3>brought to you by...</h3>
          <div className="footer-about-container">
            <div className="footer-dev-container">
              <span>Dan Purcell</span>
              <div className="footer-logo-container">
                <a href='https://www.linkedin.com/in/dan-purcell-fifteen/' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg' alt='linkedin icon' />
                </a>
                <a href='https://github.com/flow-state-15' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636744326/discord_group_projo_assets/128-1280162_github-logo-png-cat-transparent-png_ivzcm9.png' alt='github icon' />
                </a>
              </div>
            </div>
            <div className="footer-dev-container">
              <span>Jason Zhou</span>
              <div className="footer-logo-container">
                <a href='https://www.linkedin.com/in/jazon-zhou/' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg' alt='linkedin icon' />
                </a>
                <a href='https://github.com/CroissantAhhh' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636744326/discord_group_projo_assets/128-1280162_github-logo-png-cat-transparent-png_ivzcm9.png' alt='github icon' />
                </a>
              </div>
            </div>
            <div className="footer-dev-container">
              <span>Michael Ericsson</span>
              <div className="footer-logo-container">
                <a href='https://www.linkedin.com/in/michaelericson1/' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg' alt='linkedin icon' />
                </a>
                <a href='https://github.com/Concrete18' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636744326/discord_group_projo_assets/128-1280162_github-logo-png-cat-transparent-png_ivzcm9.png' alt='github icon' />
                </a>
              </div>
            </div>
            <div className="footer-dev-container">
              <span>Nebyou Ejigu</span>
              <div className="footer-logo-container">
                <a href='' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636743583/discord_group_projo_assets/linkedin-tile_xvsp19.svg' alt='linkedin icon' />
                </a>
                <a href='https://github.com/nebbb' target='_blank' rel='noreferrer'>
                  <img src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636744326/discord_group_projo_assets/128-1280162_github-logo-png-cat-transparent-png_ivzcm9.png' alt='github icon' />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
