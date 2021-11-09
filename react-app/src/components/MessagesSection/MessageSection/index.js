export default function MessageSection({ message }) {
  // console.log("***** testing date, message.sent_date: ", message.sent_date)
  // const event = new Date(Date.UTC(message.sent_date));
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // const converted = event.toLocaleDateString(undefined, options)
  return (
    <div className="message-section">
      <p>{message.content}</p>
      <p>{message.sent_date}</p>
    </div>
  );
}
