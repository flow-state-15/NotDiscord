import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function DMIcon({ channel }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [otherUser, setOtherUser] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/channels/members/${channel.id}`);

      if (response.ok) {
        const members = await response.json();
        setOtherUser(members["members"][1]);
      }
    })();
  }, [channel]);

  function goToDM() {
    history.push(`/channels/@me/${channel.id}`);
  }

  return (
    <div className={`DM-icon DM-icon-${channel.id}`} onClick={goToDM}>
      <div className="user-info">
        <div className="avatar-wrapper">
          <img src={otherUser.avatar} alt="Avatar" className="avatar" />
          <div className="status-holder status-holder-bg-color">
            <div className="status-icon"></div>
          </div>
        </div>
        <div className="name-tag name-tag-custom">
          <div>
            <h1 className="username username-color">
              {otherUser?.tagged_name?.split("#")[0]}
            </h1>
          </div>
          <div
            className="name-tag-close"
            onClick={() => {
              document.querySelector(`.DM-icon-${channel.id}`).style.display =
                "none";
            }}
          >
            <svg
              className="closeIcon-rycxaQ"
              aria-hidden="false"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path
                fill="#B9BBBE"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
