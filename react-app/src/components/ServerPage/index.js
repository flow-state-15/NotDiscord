import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ServerChannelsBar from "../ServerChannelsBar";
import MessagesSection from "../MessagesSection";
import MembersSection from "../MembersSection";
import { loadServerChannels } from "../../store/channels";
import { loadChannelMessages } from "../../store/messages";
import { loadServerMembers } from "../../store/members";

import "./ServerPage.css";

export default function ServerPage() {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const [serverChannelsFound, setServerChannelsFound] = useState(false);
  const [serverMembersFound, setServerMembersFound] = useState(false);
  const [channelMessagesFound, setChannelMessagesFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadServerChannels(serverId)).then(() =>
      setServerChannelsFound(true)
    );
    dispatch(loadServerMembers(serverId)).then(() =>
      setServerMembersFound(true)
    );
  }, [serverId, dispatch]);

  useEffect(() => {
    dispatch(loadChannelMessages(channelId)).then(() =>
      setChannelMessagesFound(true)
    );
  }, [channelId, dispatch]);

  const serverChannels = useSelector((state) => Object.values(state.channels));
  const channelMessages = useSelector((state) => Object.values(state.messages));
  const serverMembers = useSelector((state) => Object.values(state.members));

  useEffect(() => {
    if (serverChannelsFound && serverMembersFound && channelMessagesFound) {
      setIsLoaded(true);
    }
  }, [serverChannelsFound, serverMembersFound, channelMessagesFound]);

  return (
    <div className="server-page">
      {/* <NavBar /> */}
      {isLoaded && (
        <div className="server-page-content">
          <ServerChannelsBar channels={serverChannels} />
          <MessagesSection messages={channelMessages} />
          <MembersSection members={serverMembers} />
        </div>
      )}
    </div>
  );
}
