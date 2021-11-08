import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessage } from '../../store/messages';

export default function ChatBar() {
    const dispatch = useDispatch();
    const [ content, setContent ] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const { channelId } = useParams();

    function onSendMessage(e) {
        e.preventDefault();
        if (content) {
            const message = {
                user_id: sessionUser?.id,
                channel_id: channelId,
                content,
            };
            dispatch(addMessage(message));
            setContent('')
        }

    }
    return (
        <div className="chat-bar">
            <form className="chat-bar-body" onSubmit={onSendMessage}>
                <input
                className="chat-bar-text-field"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}></input>
            </form>
        </div>
    )
}
