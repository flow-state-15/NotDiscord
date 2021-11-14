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
  const sessionUser = useSelector(state => state.session.user);
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
    history.push(`/channels/${serverId}/${newChannel.id}`)
  }

  return (
    <>
      <button
        className="add-channel-button"
        onClick={() => setShowModal(true)}
      >Add Channel</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-channel-modal">
            <p className='add-channel-title'>Create Channel</p>
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
