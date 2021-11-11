import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateChannel, removeChannel } from "../../store/channels";
import "./EditServerChannelModal.css";

export default function EditServerChannelModal({ channel }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [channelName, setChannelName] = useState(channel.name)

    function editChannelName(e) {
        e.preventDefault();

        const channelNew = {
            ...channel,
            name: channelName
        }
        dispatch(updateChannel(channelNew));
        setShowModal(false);
    }

    function deleteChannel() {
        dispatch(removeChannel(channel.id));
        setShowModal(false);
    }

    return (
        <>
            <button className="server-channel-settings" onClick={() => setShowModal(true)}>
                <h2>E/D</h2>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="edit-server-channel-modal">
                        <form className="edit-server-channel-form" onSubmit={editChannelName}>
                            <input
                            className="edit-server-channel-name"
                            value={channelName}
                            onChange={e => setChannelName(e.target.value)}></input>
                        </form>
                        <button className="delete-server-channel" onClick={deleteChannel}>
                            Delete Channel
                        </button>
                    </div>
                </Modal>
            )}
        </>
    )
}
