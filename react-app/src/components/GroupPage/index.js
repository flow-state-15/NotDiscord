import NavBar from "../NavBar"
import MyChannelsBar from "../MyChannelsBar"
import MessagesSection from "../MessagesSection"
import MembersSection from "../MembersSection"
import './GroupPage.css';

export default function GroupPage() {
    return (
        <div className="group-page">
            <h1>Group Page</h1>
            <NavBar/>
            <div className="group-page-content">
                <MyChannelsBar/>
                <MessagesSection />
                <MembersSection />
            </div>
        </div>
    )
}
