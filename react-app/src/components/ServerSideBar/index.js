import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadUserServers } from '../../store/servers'
import ServerIcon from "./ServerIcon";
import "./ServerSideBar.css";

export default function ServerSideBar() {
  const dispatch = useDispatch()
  const servers = useSelector(state => state.servers)
  const user = useSelector(state => state.session.user)

  useEffect(()=> {
    dispatch(loadUserServers(user.id))
  }, [])

  const allServers = Object.values(servers)

  const serversComponents = allServers.map((server) => {
    return (
      <li key={server.id}>
        <Link to={`/channels/${server.id}`}>
          <ServerIcon />
          {server.name}
        </Link>
      </li>
    );
  });

  return (
    <div className="server-side-bar">
      <div className="side-bar-home"></div>
      <div className="side-bar-seperator"></div>
      {serversComponents}
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <ServerIcon />
      <div className="side-bar-add">
        <svg
          className="circleIcon-2_77lA"
          aria-hidden="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#3BA55D"
        >
          <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
        </svg>
      </div>
      <div className="side-bar-discover">
        <svg
          aria-hidden="false"
          className="circleIcon-2_77lA"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#3BA55D"
        >
          <path d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"></path>
        </svg>
      </div>
    </div>
  );
}
