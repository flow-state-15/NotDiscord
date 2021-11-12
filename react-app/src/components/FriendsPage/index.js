import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUserChannels } from "../../store/channels";

import NavBar from "../NavBar";
import MyChannelsBar from "../MyChannelsBar";
import FriendsSection from "../FriendsSection";
import "./FriendsPage.css";

export default function FriendsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadUserChannels(sessionUser?.id));
  }, [sessionUser?.id, dispatch]);

  const userChannels = useSelector((state) => Object.values(state.channels));

  return (
    <div className="friends-page">
      {/* <NavBar/> */}
      <div className="friends-page-content">
        <MyChannelsBar channels={userChannels} />
        <FriendsSection />
      </div>
    </div>
  );
}
