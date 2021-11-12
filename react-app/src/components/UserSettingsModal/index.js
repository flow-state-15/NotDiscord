import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateUser, deleteUser } from "../../store/session";
import "./UserSettingsModal.css";

export default function UserSettingsModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(sessionUser?.tagged_name.split('#')[0]);
  const [userHash, setUserHash] = useState(sessionUser?.tagged_name.split('#')[1]);
  const [userAvatar, setUserAvatar] = useState(sessionUser?.avatar);

  function editUser(e) {
    e.preventDefault();

    const userUpdate = {
      ...sessionUser,
      tagged_name: userName + "#" + userHash,
      avatar: userAvatar,
    };
    dispatch(updateUser(userUpdate));
    setShowModal(false);
  }

  function removeUser() {
    dispatch(deleteUser(sessionUser?.id));
    setShowModal(false);
  }

  return (
    <>
      <button
        className="user-settings"
        onClick={() => setShowModal(true)}
      >Gear</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="edit-user-modal">
            <form className="edit-user-form" onSubmit={editUser}>
              <label htmlFor="edit-user-name">User Name</label>
              <input
                id="edit-user-name"
                className="edit-user-name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
              <label htmlFor="edit-user-hash">User Hash</label>
              <input
                id="edit-user-hash"
                className="edit-user-hash"
                value={userHash}
                onChange={(e) => setUserHash(e.target.value)}
              ></input>
              <label htmlFor="edit-user-avatar">User Avatar</label>
              <input
                id="edit-user-avatar"
                className="edit-user-avatar"
                value={userAvatar}
                onChange={(e) => setUserAvatar(e.target.value)}
              ></input>
              <button className="submit-edit-user-modal" type="submit">
                Edit User Info
              </button>
            </form>
            <button className="delete-account" onClick={removeUser}>
              Delete Account
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
