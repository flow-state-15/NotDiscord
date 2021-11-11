import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./MemberPopOut.css";

export const MemberPopOutContext = React.createContext();

export const useMemberPopOut = () => useContext(MemberPopOutContext);

export default function MemberPopOutProvider({ children }) {
    const MemberPopOutRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
      setValue(MemberPopOutRef.current);
    }, [])


    return (
      <>
        <MemberPopOutContext.Provider value={value}>
          {children}
        </MemberPopOutContext.Provider>
        <div ref={MemberPopOutRef} />
      </>
    );
}

export function MemberPopOut({ onClose, children }) {
    const MemberPopOutNode = useContext(MemberPopOutContext);
    if (!MemberPopOutNode) return null;

    return ReactDOM.createPortal(
      <div id="member-PopOut">
        <div id="member-PopOut-background" onClick={onClose} />
        <div id="member-PopOut-content">
          {children}
        </div>
      </div>,
      MemberPopOutNode
    );
}
