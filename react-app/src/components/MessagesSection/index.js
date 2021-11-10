import MessageSection from "./MessageSection";
import ChatBar from "./ChatBar";
import "./MessageSection.css";
import { useRef, useEffect } from "react";

export default function MessagesSection({ messages }) {
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
      <div className="message-container-inner-hooblah">{messageComponents}</div>
      <ChatBar />
    </div>
  );
}
