import MemberSection from "./MemberSection"

export default function MembersSection({ members }) {
    return (
        <div className="members-section">
            <h2>Members</h2>
            {members.map((member) => {
                return <MemberSection member={member} />
            })}
        </div>
    )
}
