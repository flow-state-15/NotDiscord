import { useState, useEffect } from "react";
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
  const [dynamicClassName, setdynamicClassName] = useState(
    "not-validated-submit-className"
  );
  const regex =
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;

  async function postServer(e) {
    e.preventDefault();

    const newServerData = {
      name: serverName,
      owner_id: sessionUser?.id,
      icon: serverIcon,
    };

    const newServer = await dispatch(addServer(newServerData));
    setServerName("");
    setShowModal(false);
    history.push(`/channels/${newServer.id}/${newServer.firstChannelId}`);
  }

  useEffect(() => {
    if (serverName !== "") setdynamicClassName("validated-submit-className");
    else setdynamicClassName("not-validated-submit-className");
  }, [serverName]);

  function setDisabled() {
    if (serverName === "") return true;
  }

  return (
    <div daattribute={"Explore Public Servers"}>
      {/* <button className="add-channel-button" onClick={() => setShowModal(true)}>
        Add Server
      </button> */}
      <div
        daattribute={"Explore Public Servers"}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <svg
          className="circleIcon-2_77lA"
          aria-hidden="false"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#3BA55D"
        >
          <path d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path>
        </svg>
        <div className="main-server-servers-name">
          <h4 className="main-server-servers-name-text">Add Server</h4>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="add-server-modal">
            <form className="add-server-form" onSubmit={postServer}>
              <h1>Customize your server</h1>
              <p>
                Give your server a personality with a name and an icon. You can
                always change it later.
              </p>
              <div className="add-server-circle-container">
                <span
                  style={{
                    position: "absolute",
                    top: "2rem",
                    left: "2rem",
                    fontSize: "1.25rem",
                  }}
                >
                  icon
                  <br />
                  preview
                </span>
                <img
                  className="dashed-circle"
                  src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1636772936/discord_group_projo_assets/dashed-circle_nkfvyk.png"
                  alt="avatar preview"
                />
                {serverIcon ? (
                  <img
                    classname="circle-icon-preview"
                    style={{
                      borderRadius: "50%",
                      width: "7rem",
                      height: "7rem",
                      top: "0.5rem",
                      left: "0.52rem",
                    }}
                    alt=''
                    src={
                      regex.test(serverIcon) &&
                      serverIcon.endsWith(".jpg" || ".png" || ".gif")
                        ? serverIcon
                        : null
                    }
                  />
                ) : null}
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
                <button
                  className="back-add-server-modal"
                  onClick={() => setShowModal(!showModal)}
                >
                  Back
                </button>
                <button
                  className={dynamicClassName}
                  disabled={() => setDisabled()}
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
