import NavBar from "../NavBar"
import ServerChannelsBar from "../ServerChannelsBar"
import MessagesSection from "../MessagesSection"
import MembersSection from "../MembersSection"
import './ServerPage.css'

export default function ServerPage() {
    return (
        <div className="server-page">
            <h1>Server Page</h1>
            <NavBar/>
            <div className="server-page-content">
                <ServerChannelsBar />
                <MessagesSection />
                <MembersSection />
            </div>
        </div>
    )
}
