
import MessageSection from "./MessageSection";
import ChatBar from "./ChatBar";

export default function MessagesSection({ messages }) {

  const messageComponents = messages?.map((message) => {
    return (
      <MessageSection message={message} />
    );
  });

  return (
    <div className="messages-section">
      <h2>Messages</h2>
      {messageComponents}
      <ChatBar />
    </div>
  );
}
