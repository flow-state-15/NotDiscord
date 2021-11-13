import { csrfFetch } from "./csrf";

const LOAD = "messages/LOAD";
const ADD = "messages/ADD";
const REMOVE = "messages/REMOVE";

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (message) => ({
  type: ADD,
  message,
});

const remove = (messageId) => ({
  type: REMOVE,
  messageId,
});

export const loadChannelMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/messages/byChannel/${channelId}`);

  if (response.ok) {
    const messages = await response.json();
    dispatch(load(messages["messages"]));
  }
};

export const addMessage = (formData) => async (dispatch) => {
  const response = await csrfFetch("/api/messages/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const message = await response.json();
    // console.log("**** IN ADD MSG THUNK, response: ", message)
    dispatch(add(message));
    return message;
  }
};

export const updateMessage = (formData) => async (dispatch) => {
  console.log(formData);

  const response = await fetch(`/api/messages/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const message = await response.json();
    dispatch(add(message));
  }
};

export const removeMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const messageId = await response.json();
    console.log(messageId);
    dispatch(remove(messageId.message_id));
  }
};

const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let message of action.list) {
        newState[message.id] = message;
      }
      return newState;
    case ADD:
      // return { ...state, [action.message.id]: action.message };
      return { ...state };
    case REMOVE:
      const newMessages = { ...state };
      delete newMessages[action.messageId];
      return newMessages;
    default:
      return state;
  }
};

export default messageReducer;
