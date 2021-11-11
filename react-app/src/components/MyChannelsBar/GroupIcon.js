export default function GroupIcon() {
  return (
    <div className="group-icon">
      <div className="user-info">
        <div className="avatar-wrapper">
          <img
            src="https://raw.githubusercontent.com/flow-state-15/discord_clone_group_projo/master/assets/discord-group-icons/green-discord-group.png"
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="name-tag name-tag-custom">
          <div>
            <h1 className="username username-color">Discord Group</h1>
            <h1 className="username username-color username-alias-to-group">
              4 Members
            </h1>
          </div>
          <div className="name-tag-close">
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
