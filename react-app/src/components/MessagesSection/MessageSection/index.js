import { useState } from "react";
import { updateMessage, removeMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";
import Linkify from "react-linkify";
import MemberIconPopOut from "../../MemberIconPopOut";

export default function MessageSection({ message }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(message.content);

  // sets up local time for the message
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

  // TODO detect images and invite links
  const regex =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  let found_link = message.content.match(regex);
  if (found_link && found_link.length > 0) found_link = found_link[0];
  let embed = "";
  let link;
  if (found_link) {
    link = found_link;
    if (
      found_link.includes(".jpg") ||
      found_link.includes(".png") ||
      found_link.includes(".gif")
    ) {
      embed = (
        <a href={found_link}>
          <img
            src={found_link}
            alt="discord image embed"
            className="message_image_embed embed"
          />
        </a>
      );
    } else if (found_link.includes("https://www.youtube.com/watch")) {
      const youtube_code = found_link.split("=")[1];
      embed = (
        <div className="youtube-embed">
          <p>YouTube</p>
          <iframe
            src={`https://www.youtube.com/embed/${youtube_code}`}
            className="youtube_embed"
            width="400"
            height="225"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
            controls="0"
          />
        </div>
      );
    } else if (found_link.includes("invite-link")) {
      embed = (
        <div className="embed">
          <p>Server Name</p>
          <p>Fun server yay</p>
        </div>
      );
    }
  }

  function addLinks(content) {
    let message = "";
    for (let word of content.split(" ")) {
      if (message.includes("http")) {
        message += <a href={word}>{word}</a>;
      } else {
        message += `${word} `;
      }
    }
    return message;
  }

  function editMessage(e) {
    e.preventDefault();
    const editedMessage = {
      ...message,
      content: messageContent,
    };
    delete editedMessage.user;
    // console.log(editedMessage)
    // console.log(message)

    dispatch(updateMessage(editedMessage));
    setIsEditing(false);
  }

  function deleteMessage() {
    dispatch(removeMessage(message.id));
  }

  return (
    <div className="message-section">
      <MemberIconPopOut member={message.user} />
      <div className="message-section-body">
        <div className="message-section-user-time">
          <p className="message-section-user">
            {message.user.tagged_name.split("#")[0]}
          </p>
          <p className="message-section-time">{converted}</p>
        </div>
        <div className="message-section-content">
          {isEditing && (
            <>
              <form
                className="edit-message"
                onSubmit={(e) => {
                  editMessage(e);
                }}
              >
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                ></input>
              </form>
              {/* {embed && embed} */}
            </>
          )}
          {!isEditing && (
            <>
              <Linkify
                properties={{
                  target: "_blank",
                }}
              >
                {message.content}
              </Linkify>
              {/* {embed && embed} */}
            </>
          )}
          {embed && embed}
        </div>
      </div>
      <div className="message-edit-delete">
        <div>
          <button
            className="message-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            <svg
              className="icon-3Gkjwa"
              aria-hidden="false"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
                fill="rgb(220, 221, 222)"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <button className="message-delete" onClick={deleteMessage}>
            <svg
              className="icon-LYJorE"
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
    </div>
  );
}
