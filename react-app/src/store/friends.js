// import { csrfFetch } from "../store copy/csrf";

const LOAD = "friends/LOAD";
const ADD = "friends/ADD";
const REMOVE = "friends/REMOVE";
const UPDATE = "friends/UPDATE";

const load = (friendList) => ({
  type: LOAD,
  friendList,
});

const add = (friend) => ({
  type: ADD,
  friend,
});

const remove = (friendId) => ({
  type: REMOVE,
  friendId,
});

const update = (friendId) => ({
  type: UPDATE,
  friendId,
});

export const loadUserFriends = (userId) => async (dispatch) => {
  const response = await fetch(`/api/friends/${userId}`);

  console.log("**** IN LOAD FRIENDS THUNK ****, userId: ", userId);
  if (response.ok) {
    const friends = await response.json();
    dispatch(load(friends["friends"]));
  }
};

export const addFriend = (formData) => async (dispatch) => {
  const response = await fetch("/api/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const channel = await response.json();
    dispatch(add(channel["channel"]));
  }
};

export const acceptFriendRequest = (friendId, dataId) => async (dispatch) => {
  const response = await fetch(`/api/friends/accept/${dataId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const friend = await response.json();
    dispatch(update(friendId));
  }
};

export const removeFriend = (friendId, dataId) => async (dispatch) => {
  const response = await fetch(`/api/friends/delete/${dataId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("IN REMOVE FRIEND");

  if (response.ok) {
    const friend = await response.json();
    dispatch(remove(friendId));
  }
};

const friendReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let friend of action.friendList) {
        newState[friend.id] = friend;
      }
      return newState;
    case ADD:
      return { ...state, [action.friend.id]: action.friend };
    case UPDATE:
      const oldFriends = { ...state };
      const toUpdate = oldFriends[action.friendId];
      toUpdate.friend_data.accepted = true;
      return { ...state, [action.friendId]: toUpdate };
    case REMOVE:
      const newFriends = { ...state };
      delete newFriends[action.friendId];
      return newFriends;
    default:
      return state;
  }
};

export default friendReducer;
