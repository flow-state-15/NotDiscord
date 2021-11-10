import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MemberPopout } from "../../context/MemberPopout";
import ChatBar from "../MessagesSection/ChatBar";

function MemberIconPopout({ member, position }) {
  const dispatch = useDispatch();
  const [showPopout, setShowPopout] = useState(false);
  const [popoutStyle, setPopoutStyle] = useState({});
  const sessionUser = useSelector((state) => state.session.user);

  //   const topScroll = window.pageYOffset || document.documentElement.scrollTop;
  //   const leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

  // if scroll happens, set it to the previous value
  //   window.onscroll = () => {
  //     if (showPopout) {
  //       window.scrollTo(leftScroll, topScroll);
  //     }
  //   };

  function openMenu(e) {
    setShowPopout(true);
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
      setPopoutStyle({
        ...fixedStyle,
        left: buttonRect.left - position || buttonRect.left + 50,
        bottom: window.innerHeight - buttonRect.bottom,
      });
    } else {
      setPopoutStyle({
        ...fixedStyle,
        left: buttonRect.left - position || buttonRect.left + 50,
        top: buttonRect.top,
      });
    }
  }

  return (
    <>
      <div className="user-avatar" onClick={openMenu}>
        <img
          className="user-avatar-single"
          src={member.avatar}
          alt="member avatar"
        ></img>
      </div>

      {showPopout && (
        <MemberPopout onClose={() => setShowPopout(false)}>
          <div className="member-popout" style={popoutStyle}>
            <div className="member-popout-content">
              <div className="member-popout-content-top"></div>
              <div className="member-popout-content-bottom">
                <div className="avatar-wrapper avatar-wrapper-popout">
                  <img src={member.avatar} alt="Avatar" className="avatar" />
                  <div className="status-holder status-holder-popout">
                    <div className="status-icon status-icon-popout"></div>
                  </div>
                </div>
                <div>
                  <p>{member.tagged_name}</p>
                </div>
                <div>
                  <h3>About me</h3>
                  <p>{"member.tagged_name"}</p>
                </div>
                <div>
                  <input />
                </div>
              </div>
            </div>
          </div>
        </MemberPopout>
      )}
    </>
  );
}

export default MemberIconPopout;
