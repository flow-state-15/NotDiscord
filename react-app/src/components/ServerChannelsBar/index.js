import ServerChannelListing from "./ServerChannelListing"

export default function ServerChannelsBar({ channels }) {

    // console.log("in server channels bar, channels prop: ", channels)

    return (
        <div className="server-channels-bar">
            <h2>Channels</h2>
            {channels.map((channel) => {
                return <ServerChannelListing key={channel.id} channel={channel}></ServerChannelListing>
            })}
        </div>
    )
}
