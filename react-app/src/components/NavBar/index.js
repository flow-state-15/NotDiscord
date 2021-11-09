import { useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import InviteMembers from './InviteMembers';

export default function NavBar() {
    const URL = window.location.href;
    const { channelId } = useParams();
    const channels = useSelector(state => Object.values(state.channels));
    const [channelName, setChannelName] = useState('');
    const [isServer, setIsServer] = useState(false);

    useEffect(() => {
        setChannelName(channels?.find(channel => channel.id === channelId).name)
    },[channelId])

    useEffect(() => {
        setIsServer(!URL.includes('@me'));
    }, [URL])

    return (
        <div className="nav-bar">
            <h3>{channelName}</h3>
            {isServer && (
                <InviteMembers></InviteMembers>
            )}
        </div>
    )
}
