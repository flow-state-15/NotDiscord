import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MemberPopout } from "../../context/MemberPopout";

function MemberIconPopout({ member }) {
    const dispatch = useDispatch();
    const [ showPopout, setShowPopout ] = useState(false);
    const [ popoutStyle, setPopoutStyle ] = useState({});
    const sessionUser = useSelector(state => state.session.user);

    const topScroll = window.pageYOffset || document.documentElement.scrollTop;
    const leftScroll = window.pageXOffset || document.documentElement.scrollLeft;

    // if scroll happens, set it to the previous value
    window.onscroll = () => {
        if (showPopout) {
            window.scrollTo(leftScroll, topScroll);
        }
    };

    function openMenu(e) {
        setShowPopout(true);
        const buttonRect = e.target.getBoundingClientRect();
        const fixedStyle = {
            width: '200px',
            visibility: 'visible',
            backgroundColor: 'rgb(92, 92, 92)',
            position: 'absolute',
            zIndex: 2,
            borderRadius: '10px',
            padding: '10px',
        };
        if (buttonRect.top > 500) {
            setPopoutStyle({...fixedStyle, left: buttonRect.left + 50, bottom: window.innerHeight - buttonRect.bottom })
        } else {
            setPopoutStyle({...fixedStyle, left: buttonRect.left + 50, top: buttonRect.top })
        }
    };

    return (
        <>
            <div className="member-icon-container" onClick={openMenu}>
                <img src={member.avatar} alt="member avatar"></img>
            </div>
            {showPopout && (
                <MemberPopout onClose={() => setShowPopout(false)}>
                    <div className="member-popout" style={popoutStyle}>
                        <div className="member-popout-content">
                            <p>{member.name}</p>
                        </div>
                    </div>
                </MemberPopout>
            )}
        </>
    );
}

export default AddPlaylistPopout;
