import { loadUserFriends } from "../../store/friends";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendSection from "./FriendSection";
import PendingFriendSection from "./PendingFriendSection";
import NavBar from "../NavBar";
import "./FriendsSection.css";

export default function FriendsSection() {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadUserFriends(user.id));
  }, []);

  const friendList = Object.values(friends);

  const friendsComponents = friendList.map((friend) => {
    if (friend.friend_data.accepted) return <FriendSection friend={friend} />;
  });

  const notFriendsComponents = friendList.map((friend) => {
    if (!friend.friend_data.accepted)
      return <PendingFriendSection friend={friend} />;
  });

  return (
    <div className="friends-section">
      <NavBar />
      <h2 className="friends-section-online">{`Online - ${
        friendList.filter((friend) => friend.friend_data.accepted).length
      }`}</h2>
      <div className="friends-section-friends-container">
        {friendsComponents}
      </div>
      <h2 className="friends-section-online">{`Pending - ${
        friendList.filter((friend) => !friend.friend_data.accepted).length
      }`}</h2>
      <div className="friends-section-friends-container">
        {notFriendsComponents}
      </div>
    </div>
  );
}
