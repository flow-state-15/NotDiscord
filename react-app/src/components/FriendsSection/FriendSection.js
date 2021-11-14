import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function FriendSection({ friend }) {
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
            <div className="member-section-single-row">
              <div className="message-box-member" onClick={onFriendMessage}>
                <svg
                  className="icon-35-fSh"
                  aria-hidden="false"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="#B9BBBE"
                    d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"
                  ></path>
                </svg>
                <div className="member-section-PopOut">
                  <p className="member-section-PopOut-text">Message</p>
                </div>
              </div>
              <div className="message-box-member">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="#36393F"
                  viewBox="0 0 24 24"
                  width="21"
                  height="21"
                  stroke="#B9BBBE"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <div className="member-section-PopOut member-section-PopOut-less">
                  <p className="member-section-PopOut-text">Remove</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
