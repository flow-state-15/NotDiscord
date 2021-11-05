import { csrfFetch } from "./csrf";

const LOAD = 'members/LOAD';
const ADD = 'members/ADD';
const REMOVE = 'members/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (member) => ({
    type: ADD,
    member
});

const remove = (memberId) => ({
    type: REMOVE,
    memberId
});

export const loadChannelMembers = (channelId) => async dispatch => {
    const response = await csrfFetch(`/api/members/byChannel/${channelId}`);

    if (response.ok) {
        const members = await response.json();
        dispatch(load(members["members"]));
    };
};

export const loadServerMembers = (serverId) => async dispatch => {
  const response = await csrfFetch(`/api/members/byServer/${serverId}`);

  if (response.ok) {
      const members = await response.json();
      dispatch(load(members["members"]));
  };
};

export const addMember = (formData) => async dispatch => {
    const response  = await csrfFetch("/api/members", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const member = await response.json();
        dispatch(add(member["member"]));
    }
};

export const updateMember = (formData) => async dispatch => {
    const response = await csrfFetch("/api/members", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const member = await response.json();
        dispatch(add(member["member"]));
    }
}

export const removeMember = (memberId) => async dispatch => {
    const response = await csrfFetch(`/api/members/${memberId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const member = await response.json();
        dispatch(remove(member.member))
    }
}

const memberReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let member of action.list) {
                newState[member.id] = member;
            };
            return newState;
            case ADD:
                return {...state, [action.member.id]: action.member}
            case REMOVE:
                const newmembers = {...state};
                delete newmembers[action.memberId];
                return newmembers;
        default:
            return state;
    }
};

export default memberReducer;
