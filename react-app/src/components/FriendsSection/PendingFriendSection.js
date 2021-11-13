import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function PendingFriendSection({ friend }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  async function onFriendMessage(e) {
    e.preventDefault();
    const response = await fetch(
      `/api/channels/DM/${sessionUser?.id}/${friend.id}`
    );
    if (response.ok) {
      const DMChannel = await response.json();
      history.push(`/channels/@me/${DMChannel.id}`);
    }
  }

  function ingoreFriendRequest(e) {
    e.preventDefault();
  }

  return (
    <div className="friend-section">
      <div className="DM-icon DM-icon-alias-to-members">
        <div className="user-info">
          <div className="avatar-wrapper">
            <img src={friend.avatar} alt="Avatar" className="avatar" />
            <div className="status-holder status-holder-bg-color status-holder-bg-color-2">
              <div className="status-icon"></div>
            </div>
          </div>
          <div className="name-tag name-tag-custom">
            <div>
              <h1 className="username username-color username-color-alias-members">
                {friend.tagged_name.split("#")[0]}
                <span className="username-tag-member">
                  #{friend.tagged_name.split("#")[1]}
                </span>
              </h1>
              <h3 className="member-online-status">Online</h3>
            </div>
            {sessionUser?.id == friend.friend_data.rec_user_id && (
              <div
                className="member-section-single-row"
                onClick={onFriendMessage}
              >
                <div className="message-box-member">
                  <svg
                    class="icon-35-fSh"
                    aria-hidden="false"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#B9BBBE"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"
                    ></path>
                  </svg>
                  <div className="member-section-PopOut">
                    <p className="member-section-PopOut-text">Accept</p>
                  </div>
                </div>
                <div className="message-box-member">
                  <svg
                    class="icon-35-fSh"
                    aria-hidden="false"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#B9BBBE"
                      d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                    ></path>
                  </svg>
                  <div className="member-section-PopOut member-section-PopOut-less">
                    <p className="member-section-PopOut-text">Ignore</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
