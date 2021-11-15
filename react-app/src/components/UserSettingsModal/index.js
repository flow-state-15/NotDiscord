import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { updateUser, deleteUser } from "../../store/session";
import "./UserSettingsModal.css";
import { logout } from "../../store/session";
import { useHistory } from "react-router";

export default function UserSettingsModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState(
    sessionUser?.tagged_name.split("#")[0]
  );
  const [userHash, setUserHash] = useState(
    sessionUser?.tagged_name.split("#")[1]
  );
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

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  return (
    <>
      <button
        className="switcher tipper"
        data-tip="User Settings"
        onClick={() => setShowModal(true)}
      >
        <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
          ></path>
        </svg>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-server-modal">
            <form className="add-server-form" onSubmit={editUser}>
              <h1>Edit your user settings</h1>
              <div className="add-server-form-inputs">
                <label htmlFor="edit-user-name">User Name</label>
                <input
                  id="edit-user-name"
                  className="add-server-name"
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
              </div>
              <button className="submit-edit-user-modal" type="submit">
                Submit Changes
              </button>
              <div className="add-server-modal-button-container">
                <button className="back-add-server-modal">Back</button>
                <button className="user-settings-delete" onClick={removeUser}>
                  Delete Account
                </button>
                <button onClick={onLogout} className="user-settings-logout">
                  Logout
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
