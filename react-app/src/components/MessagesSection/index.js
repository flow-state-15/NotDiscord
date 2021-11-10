import MessageSection from "./MessageSection";
import ChatBar from "./ChatBar";
import "./MessageSection.css";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MessagesSection({ messages, channel }) {
  const messageComponents = messages?.map((message) => {
    return <MessageSection message={message} />;
  });

  useEffect(() => {
    window.scrollTo(
      0,
      document.querySelector(".message-container-inner-hooblah").scrollHeight
    );
    console.log(
      "hi",
      document.querySelector(".message-container-inner-hooblah")
    );
  }, []);

  return (
    <div className="messages-section">
      <div className="message-container-inner-hooblah">
        <div className="welcome-to-server">
          <div>#</div>
          <h3>Welcome to {`#${channel}`}</h3>
        </div>
        {messageComponents}
      </div>
      <ChatBar />
    </div>
  );
}
