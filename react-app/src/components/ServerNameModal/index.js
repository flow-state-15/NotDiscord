import "./ServerNameModal.css";
import { useRef } from "react";

export default function ServerNameModal() {
  const cont1 = useRef(null);

  const func123 = () => {
    const rect = cont1.current.getBoundingClientRect();
    console.log(rect.left, rect.top);
  };

  return (
    <>
      <div ref={cont1} onClick={func123} className="test-div-please">
        THIS IS A DIV
      </div>
      <div className="test-div-please2">THIS IS A DIV 2</div>
    </>
  );
}
