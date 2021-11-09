
export default function MessageSection({ message }) {
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
    
    return (
        <div className="message-section">
            <p>{ message.content }</p>
            <p>{ converted }</p>
        </div>
    )
}
