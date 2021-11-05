import { csrfFetch } from "./csrf";

const LOAD = 'channels/LOAD';
const ADD = 'channels/ADD';
const REMOVE = 'channels/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (channel) => ({
    type: ADD,
    channel
});

const remove = (channelId) => ({
    type: REMOVE,
    channelId
});

export const loadUserChannels = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/channels/byUser/${userId}`);

    if (response.ok) {
        const channels = await response.json();
        dispatch(load(channels["channels"]));
    };
};

export const loadServerChannels = (serverId) => async dispatch => {
    const response = await csrfFetch(`/api/channels/byServer/${serverId}`);

    if (response.ok) {
        const channels = await response.json();
        dispatch(load(channels["channels"]));
    };
};

export const addChannel = (formData) => async dispatch => {
    const response  = await csrfFetch("/api/channels", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const channel = await response.json();
        dispatch(add(channel["channel"]));
    }
};

export const updateChannel = (formData) => async dispatch => {
    const response = await csrfFetch("/api/channels", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const channel = await response.json();
        dispatch(add(channel["channel"]));
    }
}

export const removeChannel = (channelId) => async dispatch => {
    const response = await csrfFetch(`/api/channels/${channelId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const channel = await response.json();
        dispatch(remove(channel.channel))
    }
}

const channelReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let channel of action.list) {
                newState[channel.id] = channel;
            };
            return newState;
            case ADD:
                return {...state, [action.channel.id]: action.channel}
            case REMOVE:
                const newchannels = {...state};
                delete newchannels[action.channelId];
                return newchannels;
        default:
            return state;
    }
};

export default channelReducer;
