import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./nav.css";

const NavBar = () => {
  return (
    <nav className="nav_bar">
      <ul>
        <li className="nav_channel_name">
          <div className="nav_channel_name">Friends</div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
