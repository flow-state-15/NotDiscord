import ServerChannelListing from "./ServerChannelListing"

export default function ServerChannelsBar() {
    return (
        <div className="server-channels-bar">
            <h2>Channels</h2>
            <ServerChannelListing />
            <ServerChannelListing />
            <ServerChannelListing />
            <ServerChannelListing />
            <ServerChannelListing />
            <ServerChannelListing />
        </div>
    )
}
