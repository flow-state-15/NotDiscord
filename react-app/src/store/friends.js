// import { csrfFetch } from "../store copy/csrf";

const LOAD = 'friends/LOAD';
const ADD = 'friends/ADD';
const REMOVE = 'friends/REMOVE'

const load = friendList => ({
    type: LOAD,
    friendList,
});

const add = (friend) => ({
    type: ADD,
    friend
});

const remove = (userId) => ({
    type: REMOVE,
    userId
});

export const loadUserFriends = (userId) => async dispatch => {
    const response = await fetch(`/api/friends/${userId}`);

    console.log("**** IN LOAD FRIENDS THUNK ****, userId: ", userId)
    if (response.ok) {
        const friends = await response.json();
        dispatch(load(friends["friends"]));
    };
};

export const addFriend = (formData) => async dispatch => {
    const response  = await fetch("/api/channels", {
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

export const removeFriend = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`, {
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

const friendReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let friend of action.friendList) {
                newState[friend.id] = friend;
            };
            return newState;
            case ADD:
                return {...state, [action.friend.id]: action.friend}
            case REMOVE:
                const newFriends = {...state};
                delete newFriends[action.userId];
                return newFriends;
        default:
            return state;
    }
};

export default friendReducer;
