export default function MemberSection({ member }) {
<<<<<<< HEAD
=======
    // console.log("**** IN MEMBER SECTION, member: ", member)
    const memberUsername = member.tagged_name.split('#')[0];
>>>>>>> master
    return (
        <div className="member-section">
            <h2>{memberUsername}</h2>
        </div>
    )
}
