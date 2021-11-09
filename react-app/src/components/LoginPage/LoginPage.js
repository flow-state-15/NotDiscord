import "./LoginPage.css";
import { Link } from "react-router-dom";
import LoginForm from "../auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="login-container--main">
        <div className="login-page--left">
          <div>
            <h3>Welcome back!</h3>
            <p>We're so excited to see you again!</p>
          </div>
          <div>
            <LoginForm/>
            <Link>Forgot your password?</Link>
          </div>
          <div>
            <button>Login</button>
          </div>
          <div>
            <p>Need an account?</p>
            <Link>Register</Link>
          </div>
        </div>
        <div className="login-page--right">
          <div>
            <img alt="QR Code" />
          </div>
          <div>
            <h3>Log in with QR Code</h3>
            <p>Scan this with the Discord mobile app to login instantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
