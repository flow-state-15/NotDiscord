import MessageSection from "./MessageSection";
import ChatBar from "./ChatBar";
import "./MessageSection.css";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router";
let socket;

export default function MessagesSection({ messages, channel }) {
  const { channelId } = useParams();
  const user = useSelector((state) => state.session.user);
  const allChannels = useSelector((state) => state.channels);

  const [liveMessages, setLiveMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [prevRoom, setPrevRoom] = useState(channelId);
  const element = useRef(null);

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
      user: user,
      sent_date: Date.now(),
      room: channelId,
    });
    setChatInput("");
  };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const messageComponents = messages?.map((message) => {
    return <MessageSection message={message} />;
  });

  // console.log(liveMessages);

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
            Welcome to {`#${allChannels[channelId]?.name || "Loading..."}`}
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
