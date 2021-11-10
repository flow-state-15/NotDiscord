import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./MemberPopout.css";

export const MemberPopoutContext = React.createContext();

export const useMemberPopout = () => useContext(MemberPopoutContext);

export default function MemberPopoutProvider({ children }) {
    const MemberPopoutRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
      setValue(MemberPopoutRef.current);
    }, [])


    return (
      <>
        <MemberPopoutContext.Provider value={value}>
          {children}
        </MemberPopoutContext.Provider>
        <div ref={MemberPopoutRef} />
      </>
    );
}

export function MemberPopout({ onClose, children }) {
    const MemberPopoutNode = useContext(MemberPopoutContext);
    if (!MemberPopoutNode) return null;

    return ReactDOM.createPortal(
      <div id="member-popout">
        <div id="member-popout-background" onClick={onClose} />
        <div id="member-popout-content">
          {children}
        </div>
      </div>,
      MemberPopoutNode
    );
}
