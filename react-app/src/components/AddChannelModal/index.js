import { useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { addChannel } from "../../store/channels";
import "./AddChannelModal.css";

export default function AddChannelModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");

  async function postChannel(e) {
    e.preventDefault();

    const newChannelData = {
      name: channelName,
      server_id: serverId,
    };

    const newChannel = await dispatch(addChannel(newChannelData));
    setShowModal(false);
    history.push(`/channels/${serverId}/${newChannel.id}`);
  }

  return (
    <>
      <button className="add-channel-button" onClick={() => setShowModal(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff"
          width="18px"
          height="18px"
          fill="#2F3136"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-channel-modal">
            <p className="add-channel-title">Create Channel</p>
            <form className="add-channel-form" onSubmit={postChannel}>
              <label htmlFor="add-channel-name">Channel Name</label>
              <input
                id="add-channel-name"
                className="add-channel-name"
                value={channelName.replace(' ', '-')}
                onChange={(e) => setChannelName(e.target.value)}
              ></input>
              <button className="submit-add-channel-modal" type="submit">
                Add Channel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
