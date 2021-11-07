import FriendSection from "./FriendSection";
import "./FriendsSection.css";

export default function FriendsSection() {
  return (
    <div className="friends-section">
      <h2 className="friends-section-online">Online - 14</h2>
      <div className="friends-section-friends-container">
        <FriendSection />
        <FriendSection />
        <FriendSection />
        <FriendSection />
        <FriendSection />
        <FriendSection />
        <FriendSection />
      </div>
    </div>
  );
}
