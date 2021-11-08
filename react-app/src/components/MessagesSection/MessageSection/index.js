
export default function MessageSection({ message }) {
    return (
        <div className="message-section">
            <p>{ message.content }</p>
            <p>{ message.sent_date }</p>
        </div>
    )
}
