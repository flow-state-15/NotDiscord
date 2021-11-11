import { loadUserFriends } from "../../store/friends";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function DMIcon() {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(loadUserFriends(user.id))
  }, [])


  const friendList = Object.values(friends)
  // console.log("**** testing friend ****", friendList)
  const friendsComponents = friendList?.map((friend) => {
    return (
      <div className="DM-icon">
        <div className="user-info">
          <div className="avatar-wrapper">
            <img
              src={friend.avatar}
              alt="Avatar"
              className="avatar"
            />
            <div className="status-holder status-holder-bg-color">
              <div className="status-icon"></div>
            </div>
          </div>
          <div className="name-tag name-tag-custom">
            <div>
              <h1 className="username username-color">{friend.tagged_name.split('#')[0]}</h1>
            </div>
            <div className="name-tag-close">
              <svg
                className="closeIcon-rycxaQ"
                aria-hidden="false"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#B9BBBE"
                  d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );

  })
  return (
    <>
      {friendsComponents}
    </>
  )
}
