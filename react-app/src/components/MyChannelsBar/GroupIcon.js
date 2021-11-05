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
        <div className="name-tag">
          <h1 className="username username-color">Discord Group</h1>
          <h1 className="username username-color username-alias-to-group">
            3 Members
          </h1>
        </div>
      </div>
    </div>
  );
}
