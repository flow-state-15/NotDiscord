import { useState } from "react";
import { updateMessage, removeMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";
import MemberIconPopout from "../../MemberIconPopout";

export default function MessageSection({ message }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(message.content);

  const event = new Date(message.sent_date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const converted = event.toLocaleDateString(undefined, options);

  function editMessage(e) {
    e.preventDefault();
    const editedMessage = {
      ...message,
      content: messageContent
    };
    delete editedMessage.user;
    console.log(editedMessage)
    console.log(message)

    dispatch(updateMessage(editedMessage));
    setIsEditing(false);
  }

  function deleteMessage() {
    dispatch(removeMessage(message.id));
  }

  return (
    <div className="message-section">
      {/* <div className="user-avatar">
        <img
          className="user-avatar-single"
          src={message.user.avatar}
          alt="user avatar"
        ></img>
      </div> */}
      <MemberIconPopout member={message.user} />
      <div className="message-section-body">
        <div className="message-section-user-time">
          <p className="message-section-user">
            {message.user.tagged_name.split("#")[0]}
          </p>
          <p className="message-section-time">{converted}</p>
        </div>
        <div className="message-section-content">
          {isEditing && (
            <form className="edit-message" onSubmit={editMessage}>
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              ></input>
            </form>
          )}
          {!isEditing && <p className="message-content">{message.content}</p>}
        </div>
      </div>
      <div className="message-edit-delete">
        <button
          className="message-edit"
          onClick={() => setIsEditing(!isEditing)}
        >
          <svg
            class="icon-3Gkjwa"
            aria-hidden="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
              fill="rgb(220, 221, 222)"
            ></path>
          </svg>
        </button>
        <button className="message-delete" onClick={deleteMessage}>
          <svg
            class="icon-LYJorE"
            aria-hidden="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(220, 221, 222)"
              d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"
            ></path>
            <path
              fill="rgb(220, 221, 222)"
              d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
