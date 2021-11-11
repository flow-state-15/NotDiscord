import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UserChat({ member }) {
  const history = useHistory();
  const [content, setContent] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  console.log(content)

  async function onSendMessage(e) {
    console.log("DO I FUCKING SEE THIS")
    e.preventDefault();
    const DMChannel = await fetch(`api/channels/DM/${sessionUser.id}/${member.id}`);
    if (content) {
      const message = {
        user_id: sessionUser?.id,
        channel_id: DMChannel.id,
        content,
      };
      await csrfFetch("/api/messages/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      history.push(`/channels/@me/${DMChannel.id}`);
    };
  }

  return (
    <div className="user-chat-bar">
      <form className="user-chat-bar-body" onSubmit={onSendMessage}>
        <input
          className="user-chat-bar-text-field"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Message #${member.tagged_name}`}
        ></input>
      </form>
    </div>
  );
}
