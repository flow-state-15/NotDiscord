export default function FriendSection() {
  return (
    <div className="friend-section">
      <div className="DM-icon DM-icon-alias-to-members">
        <div className="user-info">
          <div className="avatar-wrapper">
            <img
              src="https://st3.depositphotos.com/25868248/35496/v/950/depositphotos_354960310-stock-illustration-smile-icon-yellow-background-tasty.jpg"
              alt="Avatar"
              className="avatar"
            />
            <div className="status-holder status-holder-bg-color">
              <div className="status-icon"></div>
            </div>
          </div>
          <div className="name-tag name-tag-custom">
            <div>
              <h1 className="username username-color username-color-alias-members">
                Concrete
                <span className="username-tag-member">#1000</span>
              </h1>
              <h3 className="member-online-status">Online</h3>
            </div>
            <div className="member-section-single-row">
              <div className="message-box-member">
                <svg
                  class="icon-35-fSh"
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
                <div className="member-section-popout">
                  <p className="member-section-popout-text">Message</p>
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
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0z"></path>
                    <path
                      fill="#B9BBBE"
                      d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"
                    ></path>
                  </g>
                </svg>
                <div className="member-section-popout member-section-popout-less">
                  <p className="member-section-popout-text">More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
