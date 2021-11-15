import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MemberPopOut } from "../../context/MemberPopOut";
import UserChat from "../UserChat";
import "./MemberIcon.css";
import { addFriend } from "../../store/friends";
import { loadUserFriends } from "../../store/friends";

function MemberIconPopOut({ member, position, sidebar }) {
  const dispatch = useDispatch();
  const [showPopOut, setShowPopOut] = useState(false);
  const [PopOutStyle, setPopOutStyle] = useState({});
  const user = useSelector((state) => state.session.user);
  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(loadUserFriends(user.id));
  }, []);

  console.log(friends);

  //   const topScroll = window.pageYOffset || document.documentElement.scrollTop;
  //   const leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  // if scroll happens, set it to the previous value
  //   window.onscroll = () => {
  //     if (showPopOut) {
  //       window.scrollTo(leftScroll, topScroll);
  //     }
  //   };

  function addFriendFunc(id) {
    const data = {
      user_id: user.id,
      friend_id: id,
    };
    dispatch(addFriend(data));
  }

  function openMenu(e) {
    setShowPopOut(true);
    const buttonRect = e.target.getBoundingClientRect();
    const fixedStyle = {
      minHeight: "25.4rem",
      width: "30rem",
      visibility: "visible",
      backgroundColor: "#18191C",
      position: "absolute",
      zIndex: 2,
      borderRadius: "6px",
      overflowY: "hidden",
    };
    if (buttonRect.top > 500) {
      setPopOutStyle({
        ...fixedStyle,
        left: buttonRect.left - position || buttonRect.left + 50,
        bottom: window.innerHeight - buttonRect.bottom,
      });
    } else {
      setPopOutStyle({
        ...fixedStyle,
        left: buttonRect.left - position || buttonRect.left + 50,
        top: buttonRect.top,
      });
    }
  }

  return (
    <>
      <div
        className={sidebar ? `user-avatar user-avatar-side` : `user-avatar`}
        onClick={openMenu}
      >
        <img
          className="user-avatar-single"
          src={member.avatar}
          alt="member avatar"
        ></img>
      </div>

      {showPopOut && (
        <MemberPopOut onClose={() => setShowPopOut(false)}>
          <div className="member-PopOut" style={PopOutStyle}>
            <div className="member-PopOut-content">
              <div className="member-PopOut-content-top">
                <div className="avatar-wrapper avatar-wrapper-PopOut">
                  <img src={member.avatar} alt="Avatar" className="avatar" />
                  <div className="status-holder status-holder-PopOut">
                    <div className="status-icon status-icon-PopOut"></div>
                  </div>
                </div>
              </div>
              <div className="member-PopOut-content-bottom">
                <div className="member-content-top-bots">
                  <div>
                    <p className="tagged-name-full">
                      <span className="tagged-name-first">
                        {member.tagged_name.split("#")[0]}
                      </span>
                      <span className="tagged-name-second">
                        {`#${member.tagged_name.split("#")[1]}`}
                      </span>
                    </p>
                  </div>

                  {!friends[member.id] && member.id != user.id && (
                    <button
                      onClick={() => addFriendFunc(member.id)}
                      className="add-friend-btn"
                    >
                      Add Friend
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="about-me-pop">About me</h3>
                  <p className="about-me-sec">🔵</p>
                </div>
                {user.id != member.id && <UserChat member={member} />}
              </div>
            </div>
          </div>
        </MemberPopOut>
      )}
    </>
  );
}

export default MemberIconPopOut;
