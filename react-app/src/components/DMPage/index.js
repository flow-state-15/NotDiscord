import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadChannelMessages } from "../../store/messages";
import { loadUserChannels } from "../../store/channels";

import NavBar from "../NavBar"
import MessagesSection from "../MessagesSection"
import MyChannelsBar from "../MyChannelsBar"
import './DMPage.css';

export default function DMPage() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(loadUserChannels(sessionUser?.id))
    }, [sessionUser.id]);

    useEffect(() => {
        dispatch(loadChannelMessages(channelId));
    }, [channelId]);

    const userChannels = useSelector(state => Object.values(state.channels));
    const channelMessages = useSelector(state => Object.values(state => state.messages))

    return (
        <div className="DM-page">
            <h1>DM Page</h1>
            <NavBar/>
            <div className="DM-page-content">
                <MyChannelsBar channels={userChannels}/>
                <MessagesSection messages={channelMessages}/>
            </div>
        </div>
    )
}
