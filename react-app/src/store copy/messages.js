import { csrfFetch } from "./csrf";

const LOAD = 'messages/LOAD';
const ADD = 'messages/ADD';
const REMOVE = 'messages/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (message) => ({
    type: ADD,
    message
});

const remove = (messageId) => ({
    type: REMOVE,
    messageId
});

export const loadChannelMessages = (channelId) => async dispatch => {
    const response = await csrfFetch(`/api/messages/byChannel/${channelId}`);

    if (response.ok) {
        const messages = await response.json();
        dispatch(load(messages["messages"]));
    };
};

export const addMessage = (formData) => async dispatch => {
    const response  = await csrfFetch("/api/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(add(message["message"]));
    }
};

export const updateMessage = (formData) => async dispatch => {
    const response = await csrfFetch("/api/messages", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(add(message["message"]));
    }
}

export const removeMessage = (messageId) => async dispatch => {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const message = await response.json();
        dispatch(remove(message.message))
    }
}

const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let message of action.list) {
                newState[message.id] = message;
            };
            return newState;
            case ADD:
                return {...state, [action.message.id]: action.message}
            case REMOVE:
                const newmessages = {...state};
                delete newmessages[action.messageId];
                return newmessages;
        default:
            return state;
    }
};

export default messageReducer;
