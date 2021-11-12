import DMIcon from "./DMIcon";
import GroupIcon from "./GroupIcon";
import UserControls from "../UserControls";
import { useSelector, useDispatch } from 'react-redux'
import { loadUserChannels } from "../../store/channels";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import "./MyChannelsBar.css";

export default function MyChannelsBar({ channels }) {
  console.log(channels)
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className="my-channels-bar">
      {channels && (
        <div className="channels-bar-inner-content">
        <button className="channels-bar-friends-btn">
          <svg
            class="linkButtonIcon-Mlm5d6"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#fff"
                fill-rule="nonzero"
                d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                transform="translate(2 4)"
              ></path>
              <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
            </g>
          </svg>
          <p>Friends</p>
        </button>
        <div className="channels-bar-inner-content-inner">
          <h2 className="channel-bar-message-title">
            Direct Messages
            <svg
              x="0"
              y="0"
              class="privateChannelRecipientsInviteButtonIcon-3A3uTc icon-22AiRD"
              aria-hidden="false"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <polygon
                fill-rule="nonzero"
                fill="#B9BBBE"
                points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"
              ></polygon>
            </svg>
          </h2>
          <div className="scrollable-my-channels">
            {channels.map((channel) => {
              console.log(channel)
              if (channel?.name.includes(" <-> ")) {
                const members = channel.name.split(" <-> ");
                for (let member of members) {
                  console.log(member)
                  const [memberId, memberName] = member.split("-");
                  if (memberId !== sessionUser?.id) {
                    channel.name = memberName.split("#")[0]
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
      )}
      <UserControls />
    </div>
  );
}
