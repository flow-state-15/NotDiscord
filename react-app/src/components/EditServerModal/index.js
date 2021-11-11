import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateServer, removeServer } from "../../store/servers";
import "./EditServerModal.css";

export default function EditServerModal({ server }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [serverName, setServerName] = useState(server.name)
    const [serverIcon, setServerIcon] = useState(server.icon);

    function editServer(e) {
        e.preventDefault();

        const serverUpdate = {
            ...server,
            name: serverName,
            icon: serverIcon,
        }
        dispatch(updateServer(serverUpdate));
        setShowModal(false);
    }

    function deleteServer() {
        dispatch(removeServer(server?.id));
        setShowModal(false);
        history.push("/channels/@me")
    }
    console.log(serverName, serverIcon)

    return (
        <>
            <button className="server-settings" onClick={() => setShowModal(true)}>
                <h2>settings</h2>
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
                            onChange={e => setServerName(e.target.value)}></input>
                            <label htmlFor="edit-server-icon">Server Icon</label>
                            <input
                            id="edit-server-icon"
                            className="edit-server-icon"
                            value={serverIcon}
                            onChange={e => setServerIcon(e.target.value)}></input>
                            <button className="submit-edit-server-modal" type="submit">Edit Server</button>
                        </form>
                        <button className="delete-server" onClick={deleteServer}>
                            Delete Server
                        </button>
                    </div>
                </Modal>
            )}
        </>
    )
}
