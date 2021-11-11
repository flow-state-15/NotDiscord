import { useState } from 'react';
import { updateMessage } from '../../../store/messages';
import { useDispatch } from 'react-redux';

export default function MessageEdit({ message }) {
    const dispatch = useDispatch();
    const [messageContent, setMessageContent] = useState(message.content);

    function editMessage(e) {
        e.preventDefault();
        const editedMessage = {
            ...message,
            content: messageContent
        };
        console.log(editedMessage)
        console.log(message)

        dispatch(updateMessage(editedMessage));
    }

    return (
        <form className='edit-message' onSubmit={editMessage}>
            <input
            type='text'
            value={messageContent}
            onChange={e => setMessageContent(e.target.value)}></input>
        </form>
    )
}
