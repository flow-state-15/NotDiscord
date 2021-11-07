import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { loadAllServers } from '../store/servers'

function ServerList() {
  const dispatch = useDispatch()
  const servers = useSelector(state => state.servers)

  useEffect(()=> {
    dispatch(loadAllServers())
  }, [])

  const allServers = Object.values(servers)

  const serversComponents = allServers.map((server) => {
    return (
      <li key={server.id}>
        <NavLink to={`/servers/${server.id}`}>{server.name}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>Server List: </h1>
      <ul>
        {serversComponents}
      </ul>
    </>
  );
}

export default ServerList;
