
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadServerMembers } from "../../store/members";
import MemberSection from "./MemberSection"

export default function MembersSection() {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    useEffect(() => {
        dispatch(loadServerMembers(serverId))
    },[serverId])

    const serverMembers = useSelector(state => Object.values(state.members));

    let allMembers;
    if (serverMembers) {
       allMembers = Object.values(serverMembers);
    }

    const memberComponents = allMembers?.map((member) => {
        return (
            <MemberSection member={member}/>
        )
    })

    return (
        <div className="members-section">
            <h2>Members</h2>
            {memberComponents}
        </div>
    )
}
