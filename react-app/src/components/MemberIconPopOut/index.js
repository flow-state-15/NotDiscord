import React, { useState } from "react";
import { MemberPopOut } from "../../context/MemberPopOut";
import UserChat from "../UserChat";


function MemberIconPopOut({ member, position, sidebar }) {
  const [showPopOut, setShowPopOut] = useState(false);
  const [PopOutStyle, setPopOutStyle] = useState({});

  //   const topScroll = window.pageYOffset || document.documentElement.scrollTop;
  //   const leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  // if scroll happens, set it to the previous value
  //   window.onscroll = () => {
  //     if (showPopOut) {
  //       window.scrollTo(leftScroll, topScroll);
  //     }
  //   };

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
              <div className="member-PopOut-content-top"></div>
              <div className="member-PopOut-content-bottom">
                <div className="avatar-wrapper avatar-wrapper-PopOut">
                  <img src={member.avatar} alt="Avatar" className="avatar" />
                  <div className="status-holder status-holder-PopOut">
                    <div className="status-icon status-icon-PopOut"></div>
                  </div>
                </div>
                <div>
                  <p>{member.tagged_name}</p>
                </div>
                <div>
                  <h3>About me</h3>
                  <p>{"member.tagged_name"}</p>
                </div>
                <UserChat member={member} />
              </div>
            </div>
          </div>
        </MemberPopOut>
      )}
    </>
  );
}

export default MemberIconPopOut;
