import { useState } from 'react';
import { updateMessage, removeMessage } from '../../../store/messages';
import { useDispatch } from 'react-redux';

export default function MessageSection({ message }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const event = new Date(message.sent_date);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const converted = event.toLocaleDateString(undefined, options)

    function editMessage(e) {
        e.preventDefault();
        const editedMessage = {

        };

        dispatch(updateMessage(editedMessage));
        setIsEditing(false);
    }

    function deleteMessage() {
        dispatch(removeMessage(editedMessage));
    }


    return (
        <div className="message-section">
            <div className="user-avatar">
                <img src={message.user.avatar} alt="user avatar"></img>
            </div>
            <div className="message-section-body">
                <div className="message-section-user-time">
                    <p className="message-section-user">{message.user.tagged_name}</p>
                    <p className="message-section-time">{converted}</p>
                </div>
                <div className="message-section-content">
                {isEditing && (
                    <form className='edit-message' onSubmit={editMessage}>
                        <input
                        type='text'
                        value={messageContent}
                        onChange={e => setMessageContent(e.target.value)}></input>
                    </form>
                )}
                {!isEditing && (
                    <p className="message-content">{message.content}</p>
                )}
                </div>
            </div>
            <div className="message-edit-delete">
                <button className="message-edit" onClick={() => setIsEditing(!isEditing)}>Edit</button>
                <button className="message-delete" onClick={deleteMessage}>Delete</button>
            </div>
        </div>
    )
}
