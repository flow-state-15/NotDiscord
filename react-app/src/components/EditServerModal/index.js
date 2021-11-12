import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateServer, removeServer } from "../../store/servers";
import "./EditServerModal.css";

export default function EditServerModal({ server }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [serverName, setServerName] = useState(server.name);
  const [serverIcon, setServerIcon] = useState(server.icon);

  function editServer(e) {
    e.preventDefault();

    const serverUpdate = {
      ...server,
      name: serverName,
      icon: serverIcon,
    };
    dispatch(updateServer(serverUpdate));
    setShowModal(false);
  }

  function deleteServer() {
    dispatch(removeServer(server?.id));
    setShowModal(false);
    history.push("/channels/@me");
  }
  console.log(serverName, serverIcon);

  return (
    <>
      <button className="server-settings" onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#D5D5D6"
          width="18px"
          height="18px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="edit-server-modal">
            <form className="edit-server-form" onSubmit={editServer}>
              <label htmlFor="edit-server-name">Server Name</label>
              <input
                id="edit-server-name"
                className="edit-server-name"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              ></input>
              <label htmlFor="edit-server-icon">Server Icon</label>
              <input
                id="edit-server-icon"
                className="edit-server-icon"
                value={serverIcon}
                onChange={(e) => setServerIcon(e.target.value)}
              ></input>
              <button className="submit-edit-server-modal" type="submit">
                Edit Server
              </button>
            </form>
            <button className="delete-server" onClick={deleteServer}>
              Delete Server
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
