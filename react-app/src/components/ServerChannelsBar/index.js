import ServerChannelListing from "./ServerChannelListing"

export default function ServerChannelsBar({ channels }) {

    // console.log("in server channels bar, channels prop: ", channels)

    return (
        <div className="channels-bar-inner-content">
            <h3>TEXT CHANNELS</h3>
            {channels.map((channel) => {
                return <ServerChannelListing key={channel.id} channel={channel}></ServerChannelListing>
            })}
        </div>
    )
}
