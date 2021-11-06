import "./ServerIcon.css";

export default function ServerIcon() {
  return (
    <div className="server-icon">
      <div className="server-img"></div>
      <div className="name-popout">
        <p>Server name</p>
        <div className="name-popout-square"></div>
      </div>
    </div>
  );
}
