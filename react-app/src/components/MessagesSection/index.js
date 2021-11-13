import MessageSection from "./MessageSection";
import ChatBar from "./ChatBar";
import "./MessageSection.css";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router";
let socket;

export default function MessagesSection({ messages }) {
  const { channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const allChannels = useSelector((state) => state.channels);
  const [sectionTitle, setSectionTitle] = useState("");
  const [liveMessages, setLiveMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [prevRoom, setPrevRoom] = useState(channelId);
  const element = useRef(null);

  useEffect(() => {
    if (allChannels[channelId]?.name.includes(" <-> ")) {
      const DMmembers = allChannels[channelId]?.name.split(" <-> ");
      const otherUser = DMmembers.find(
        (user) => sessionUser?.id !== Number(user.split("-")[0])
      );
      setSectionTitle(otherUser.split("-")[1].split("#")[0]);
    } else {
      setSectionTitle(allChannels[channelId]?.name);
    }
  }, [allChannels[channelId]?.name]);

  useEffect(() => {
    socket = io();
    socket.on("message", (chat) => {
      setLiveMessages((liveMessages) => [...liveMessages, chat]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    leaveRoom(prevRoom);
    joinRoom(channelId);
    setLiveMessages([]);
    setPrevRoom(channelId);
  }, [channelId]);

  const leaveRoom = (oldRoom) => {
    socket.emit("leave", { room: oldRoom });
  };

  const joinRoom = (newRoom) => {
    socket.emit("join", { room: newRoom });
  };

  const sendChat = (id) => {
    socket.send({
      id,
      content: chatInput,
      user: sessionUser,
      sent_date: Date.now(),
      room: channelId,
    });
    setChatInput("");
  };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const messageComponents = messages?.map((message) => {
    return <MessageSection key={message.id} message={message} />;
  });

  return (
    <div className="messages-section">
      <div
        id="message-container-inner-hooblah"
        className="message-container-inner-hooblah"
        ref={element}
      >
        <div className="welcome-to-server">
          <div className="welcome-hash-tag">
            <span>#</span>
          </div>
          <h3 className="welcome-to-text">
            Welcome to {`#${sectionTitle || "Loading..."}`}
          </h3>
        </div>
        {messageComponents}
        {liveMessages.map((message, ind) => (
          <MessageSection key={ind} message={message} />
        ))}
      </div>
      <ChatBar
        sendChat={sendChat}
        value={chatInput}
        change={updateChatInput}
        element={element}
      />
    </div>
  );
}
