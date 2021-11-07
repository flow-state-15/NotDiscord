// import { csrfFetch } from "./csrf";

const LOAD = 'servers/LOAD';
const ADD = 'servers/ADD';
const REMOVE = 'servers/REMOVE'

const load = list => ({
    type: LOAD,
    list,
});

const add = (server) => ({
    type: ADD,
    server
});

const remove = (serverId) => ({
    type: REMOVE,
    serverId
});

export const loadAllServers = () => async dispatch => {
    const response = await fetch(`/api/servers/`);
    // console.log("TESTING THUNK")
    if (response.ok) {
        const servers = await response.json();
        console.log("load all thunk: ", servers)
        dispatch(load(servers.servers));
    };
};

export const loadUserServers = (userId) => async dispatch => {
    const response = await fetch(`/api/servers/byUser/${userId}`);

    if (response.ok) {
        const servers = await response.json();
        dispatch(load(servers["servers"]));
    };
};

export const addServer = (formData) => async dispatch => {
    const response  = await fetch("/api/servers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(add(server["server"]));
    }
};

export const updateServer = (formData) => async dispatch => {
    const response = await fetch("/api/servers", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(add(server["server"]));
    }
}

export const removeServer = (serverId) => async dispatch => {
    const response = await fetch(`/api/servers/${serverId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(remove(server.server))
    }
}

const serverReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for (let item of action.list) {
                newState[item.id] = item;
            };
            return newState;
        case ADD:
            return {...state, [action.server.id]: action.server}
        case REMOVE:
            const newServers = {...state};
            delete newServers[action.serverId];
            return newServers;
        default:
            return state;
    }
};

export default serverReducer;
