import NavBar from "../NavBar"
import MessagesSection from "../MessagesSection"
import MyChannelsBar from "../MyChannelsBar"
import './DMPage.css';

export default function DMPage() {
    return (
        <div className="DM-page">
            <h1>DM Page</h1>
            <NavBar/>
            <div className="DM-page-content">
                <MyChannelsBar />
                <MessagesSection />
            </div>
        </div>
    )
}
