import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadServerChannels } from "../../store/channels";

export default function ServerChannelListing({ channel }) {
  const { serverId } = useParams();
//   const dispatch = useDispatch();
//   const channels = useSelector((state) => state.channels);
// //   const serverId = useSelector((state) => state.session.server);

//   useEffect(() => {
//       dispatch(loadServerChannels(serverId))
//   }, []);

//   const serverChannels = Object.values(channels)

//   console.log(serverChannels)

//   const channelsComponents = serverChannels.map((channel) => {
//     return (
//       <li key={channel.id}>
//         <NavLink to={`/channel/${channel.id}`}>{channel.name}</NavLink>
//       </li>
//     );
//   });

  return (
    <div className="server-channel">
      <Link to={`/channels/${serverId}/${channel.id}`}>{channel.name}</Link>
    </div>
  );
}
