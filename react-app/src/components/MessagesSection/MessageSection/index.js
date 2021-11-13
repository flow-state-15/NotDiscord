<<<<<<< HEAD
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

  // detect images and invite links
  const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  let foundLink = message.content.match(regex);
  if (foundLink && foundLink.length > 0) foundLink = foundLink[0];

  // hides links if no other text is included
  let hideLink = false;
  if (foundLink) hideLink = (foundLink.length === message.content.length);


  async function getServerByLink(serverInviteLink) {
    const server = await fetch(`/api/servers/invite/${serverInviteLink}`)
    return await server.json()
  }


  let embed = '';
  if (foundLink) {
    if (
      foundLink.includes(".jpg") ||
      foundLink.includes(".png") ||
      foundLink.includes(".gif")
    ) {
      embed = (
        <a href={foundLink}>
          <img
            src={foundLink}
            alt="image embed"
            className="message_image_embed embed"
          />
        </a>
      );
    } else if (foundLink.includes("https://www.youtube.com/watch")) {
      const youtube_code = foundLink.split("=")[1];
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
    } else if (foundLink.includes("/discord-invite/")) {
      // discord-invite
      // link example  https://www.discord.com/discord-invite/9b4ff5f3
      const inviteLink = foundLink.split('/')
      const inviteCode = inviteLink[inviteLink.length-1]
      let serverDifferent
      const server = getServerByLink(inviteCode).then(value => value).then(value => {
        serverDifferent = value
      })
      console.log(server)
      console.log(serverDifferent)

      if (server) {
        // working link
        const serverName = 'Test Server'
        const icon = ''
        embed = (
          <div className="invite_box embed">
            <p>{serverName}</p>
            <p>You've been invited to join a server</p>
            <button></button>
          </div>
        )
      } else {
        // non existent link
        embed = (
          <div className="invite_box embed">
            {<p>You sent an invite, but...</p>}
            {/* icon */}
            <p>Invalid Invite</p>
            <p>Try sending a new invite!</p>
            <button></button>
          </div>
        )
      }
    }
  }

  function editMessage(e) {
    e.preventDefault();
    const editedMessage = {
      ...message,
      content: messageContent,
    };
    delete editedMessage.user;

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
              {!hideLink &&
                <Linkify className="message-content">
                  {message.content}
                </Linkify>
              }
              {embed && embed}
            </>
          )}
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
=======
import { useState } from "react";
import { updateMessage, removeMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";
import Linkify from "react-linkify";
import MemberIconPopOut from "../../MemberIconPopOut";

export default function MessageSection({ message }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [messageContent, setMessageContent] = useState(message.content);
  
  // async function getServerByLink(serverInviteLink) {
  //   const server = await fetch(`/api/servers/invite/${serverInviteLink}`)
  //   return await server.json()
  // }

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

  // detect images and invite links
  const regex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
  let foundLink = message.content.match(regex);
  if (foundLink && foundLink.length > 0) foundLink = foundLink[0];
  
  // hides links if no other text is included
  let hideLink = false;
  if (foundLink) hideLink = (foundLink.length === message.content.length);

  let embed = '';
  if (foundLink) {
    if (foundLink.includes(".gifv")) {
      embed = (
        <video>
          <video src="https://i.imgur.com/RIFxB4N.gifv"/>
        </video>
      )
    } else if (
      foundLink.includes(".jpg") ||
      foundLink.includes(".png") ||
      foundLink.includes("-gif-") ||
      foundLink.includes(".gif")
    ) {
      embed = (
        <a href={foundLink}>
          <img
            src={foundLink}
            alt="image embed"
            className="message_image_embed embed"
          />
        </a>
      );
    } else if (foundLink.includes("https://www.youtube.com/watch")) {
      const youtube_code = foundLink.split("=")[1];
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
    } else if (foundLink.includes("giphy.com/clips/")) {
      const split = foundLink.split("-");
      const giphy_code = split[split.length-1];
      embed = (
        <div className="embed">
          <embed  
            // allow="fullscreen"
            src={`https://giphy.com/embed/${giphy_code}/video`}
            // className="giphy_embed"
            // width="480"
            // height="569"
            // frameBorder="0"
            // controls="0"
            mute="1"
          />
        </div>
      );
    } else if (foundLink.includes("gfycat.com/")) {
      // https://gfycat.com/miserableflippantchital
      const split = foundLink.split("/");
      const gfyId = split[split.length-1];
      embed = (
        <div className="embed">
          {/* <iframe  
            allow="fullscreen"
            src={`https://gfycat.com/${gfyId}`}
            // width="480"
            // height="569"
            controls="0"
          /> */}

          <iframe
          src={`https://www.gfycat.com/ifr/${gfyId}`}
          frameborder='0'
          scrolling='no'
          width='640'
          height='346'
          allowfullscreen
          />
        </div>
      );
    } else if (foundLink.includes(".mp4")) {
      embed = (
        <div className="embed">
          <video
            allow="fullscreen"
            src={foundLink}
            // width="480"
            // height="569"
            controls="0"
          />
        </div>
      );
      // https://thumbs.gfycat.com/AccomplishedGrossIsabellinewheatear-mobile.mp4
    // } else if (foundLink.includes("/discord-invite/")) {
      // discord-invite
      // link example  https://www.discord.com/discord-invite/9b4ff5f3
      // const inviteLink = foundLink.split('/')
      // const inviteCode = inviteLink[inviteLink.length-1]
      // let serverDifferent
      // const server = getServerByLink(inviteCode).then(value => value).then(value => {
      //   serverDifferent = value
      // })
      // console.log(server)
      // console.log(serverDifferent)

      // if (server) {
      //   // working link
      //   const serverName = 'Test Server'
      //   const icon = ''
      //   embed = (
      //     <div className="invite_box embed">
      //       <p>{serverName}</p>
      //       <p>You've been invited to join a server</p>
      //       <button></button>
      //     </div>
      //   )
      // } else {
      //   // non existent link
      //   embed = (
      //     <div className="invite_box embed">
      //       {<p>You sent an invite, but...</p>}
      //       {/* icon */}
      //       <p>Invalid Invite</p>
      //       <p>Try sending a new invite!</p>
      //       <button></button>
      //     </div>
      //   )
      // }
    }
  } else {
    // TODO show link with title and description

  }

  function editMessage(e) {
    e.preventDefault();
    const editedMessage = {
      ...message,
      content: messageContent,
    };
    delete editedMessage.user;

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
              {!hideLink && 
                <Linkify className="message-content">
                  {message.content}
                </Linkify>
              }
              {embed && embed}
            </>
          )}
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
                fill-rule="evenodd"
                clip-rule="evenodd"
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
>>>>>>> master
