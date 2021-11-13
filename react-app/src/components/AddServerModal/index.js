import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { addServer } from "../../store/servers";
import "./AddServerModal.css";

export default function AddServerModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState("");
  const [dynamicClassName, setdynamicClassName] = useState('not-validated-submit-className');

  async function postServer(e) {
    e.preventDefault();

    const newServerData = {
      name: serverName,
      owner_id: sessionUser?.id,
      icon: serverIcon,
    };

    const newServer = await dispatch(addServer(newServerData));
    setServerName("")
    setShowModal(false);
    history.push(`/channels/${newServer.id}/${newServer.firstChannelId}`)
  }

  useEffect(() => {
    if(serverName !== '') setdynamicClassName("validated-submit-className")
    else setdynamicClassName('not-validated-submit-className')
  }, [serverName])

  function setDisabled(){
    if (serverName === '') return true
  }

  return (
    <>
      <button
        className="add-channel-button"
        onClick={() => setShowModal(true)}
      >Add Server</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-server-modal">
            <form className="add-server-form" onSubmit={postServer}>
              <h1>Customize your server</h1>
              <p>Give your server a personality with a name and an icon. You can always change it later.</p>
              <div className='add-server-circle-container'>
                <span style={{position: 'absolute', top: '2rem', left: '2rem', fontSize: '1.25rem'}}>icon<br/> preview</span>
                <img className='dashed-circle' src='https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636772936/discord_group_projo_assets/dashed-circle_nkfvyk.png' alt='avatar preview' />
                {serverIcon ? <img classname='circle-icon-preview' style={{borderRadius: '50%', width: '7rem', height: '7rem', top: '0.5rem', left: '0.52rem'}} src={serverIcon} alt='icon preview'/> : null}
              </div>
              <div className="add-server-form-inputs">
                <label htmlFor="add-server-name">SERVER NAME</label>
                <input
                  id="add-server-name"
                  className="add-server-name"
                  required={true}
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                ></input>
                <label htmlFor="add-server-icon">SERVER ICON</label>
                <input
                  id="add-server-icon"
                  className="add-server-icon"
                  value={serverIcon}
                  onChange={(e) => setServerIcon(e.target.value)}
                ></input>
              </div>
              <div className="add-server-modal-button-container">
                <button className="back-add-server-modal" onClick={() => setShowModal(!showModal)}>Back</button>
                <button className={dynamicClassName} disabled={() => setDisabled()} type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
