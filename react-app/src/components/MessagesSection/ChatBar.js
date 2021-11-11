import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMessage } from "../../store/messages";

export default function ChatBar({ sendChat, value, change, element }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const { channelId } = useParams();
  const allChannels = useSelector((state) => Object.values(state.channels));
  const currentChannel = allChannels.find((obj) => obj.id == channelId);

  useEffect(() => {
    element.current.scrollTop = element.current.scrollHeight;
  }, [sendChat, value, change, element]);

  async function onSendMessage(e) {
    e.preventDefault();
    if (value) {
      const message = {
        user_id: sessionUser?.id,
        channel_id: channelId,
        content: value,
      };
      const theMessage = await dispatch(addMessage(message));
      sendChat(theMessage.id);
      setContent("");
    }
  }
  return (
    <div className="chat-bar">
      <form className="chat-bar-body" onSubmit={onSendMessage}>
        <input
          className="chat-bar-text-field"
          type="text"
          value={value}
          onChange={change}
          placeholder={`Message #${currentChannel?.name}`}
        ></input>
      </form>
    </div>
  );
}
