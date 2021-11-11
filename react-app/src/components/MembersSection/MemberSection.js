import MemberIconPopOut from "../MemberIconPopOut";

export default function MemberSection({ member }) {
  // console.log("**** IN MEMBER SECTION, member: ", member)
  const memberUsername = member.tagged_name.split("#")[0];
  return (
    <div className="member-section">
      <MemberIconPopOut member={member} position={320} />
      <h2>{memberUsername}</h2>
    </div>
  );
}
