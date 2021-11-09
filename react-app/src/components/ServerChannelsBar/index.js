import ServerChannelListing from "./ServerChannelListing";
import UserControls from "../UserControls";
import "./ServerChannelsBar.css";

export default function ServerChannelsBar({ channels }) {
  return (
    <div className="server-channels-bar-inner-content">
      <h3>TEXT CHANNELS</h3>
      {channels.map((channel) => {
        return (
          <ServerChannelListing
            key={channel.id}
            channel={channel}
          ></ServerChannelListing>
        );
      })}
      <UserControls />
    </div>
  );
}
