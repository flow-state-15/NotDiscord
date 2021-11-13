import { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { addServer } from "../../store/servers";
import "./AddServerModal.css";

export default function AddServerModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState("");

  async function postServer(e) {
    e.preventDefault();

    const newServerData = {
      name: serverName,
      owner_id: sessionUser?.id,
      icon: serverIcon,
    };

    const newServer = await dispatch(addServer(newServerData));
    setShowModal(false);
    history.push(`/channels/${newServer.id}/${newServer.firstChannelId}`);
  }

  return (
    <>
      <button className="add-channel-button" onClick={() => setShowModal(true)}>
        Add Server
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-server-modal">
            <form className="add-server-form" onSubmit={postServer}>
              <label htmlFor="add-server-name">Server Name</label>
              <input
                id="add-server-name"
                className="add-server-name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              ></input>
              <label htmlFor="add-server-icon">Server Icon</label>
              <input
                id="add-server-icon"
                className="add-server-icon"
                value={serverIcon}
                onChange={(e) => setServerIcon(e.target.value)}
              ></input>
              <button className="submit-add-server-modal" type="submit">
                Add Server
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
