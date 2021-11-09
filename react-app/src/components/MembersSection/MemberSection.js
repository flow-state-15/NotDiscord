export default function MemberSection({ member }) {
    // console.log("**** IN MEMBER SECTION, member: ", member)
    const memberUsername = member.tagged_name.split('#')[0];
    return (
        <div className="member-section">
            <h2>{memberUsername}</h2>
        </div>
    )
}
