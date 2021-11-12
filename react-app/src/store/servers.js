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
        const userServers = servers["servers"];
        for (let server of userServers) {
            const channelsResponse = await fetch(`/api/channels/byServer/${server.id}`)
            const serverChannels = await channelsResponse.json()
            const serverChannelsArray = serverChannels.channels;
            server.firstChannelId = serverChannelsArray[0].id
        }
        dispatch(load(userServers));
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
        dispatch(add(server));
    }
};

export const updateServer = (formData) => async dispatch => {
    const response = await fetch(`/api/servers/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const server = await response.json();
        dispatch(add(server));
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
        dispatch(remove(serverId))
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
