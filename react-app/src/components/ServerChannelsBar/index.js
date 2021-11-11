import ServerChannelListing from "./ServerChannelListing";
import UserControls from "../UserControls";
import EditServerModal from "../EditServerModal"
import "./ServerChannelsBar.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

export default function ServerChannelsBar({ channels }) {
  const { serverId, channelId } = useParams();
  const allServers = useSelector((state) => Object.values(state.servers));
  const currentServer = allServers?.find((obj) => obj.id == serverId);

  return (
    <div className="server-channels-bar-inner-content">
<<<<<<< HEAD
      <div className="server-channels-bar-header">
        <h3 className="server-channels-bar-header-title">{`${
          currentServer?.name.length >= 15
            ? currentServer?.name.slice(0, 19) + "..."
            : currentServer?.name
        }`}</h3>
        <div className="mess-with-it-later">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#D5D5D6"
            width="18px"
            height="18px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <h3 className="server-channels-title">TEXT CHANNELS</h3>
      <div className="server-channels-listings">
        {channels.map((channel) => {
          return (
            <ServerChannelListing
              key={channel.id}
              channel={channel}
            ></ServerChannelListing>
          );
        })}
      </div>
      <UserControls />
=======
      {currentServer && (
        <>
          <div className="server-channels-bar-header">
            <h3 className="server-channels-bar-header-title">{`${
              currentServer.name.length >= 15
                ? currentServer?.name.slice(0, 19) + "..."
                : currentServer?.name
            }`}</h3>
            <EditServerModal server={currentServer} />
            <div className="mess-with-it-later">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#D5D5D6"
                width="18px"
                height="18px"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <h3 className="server-channels-title">TEXT CHANNELS</h3>
          <div className="server-channels-listings">
            {channels.map((channel) => {
              return (
                <ServerChannelListing
                  key={channel.id}
                  channel={channel}
                ></ServerChannelListing>
              );
            })}
          </div>
          <UserControls />
        </>
      )}
>>>>>>> master
    </div>
  );
}
