import MemberIconPopOut from "../MemberIconPopOut";

export default function MemberSection({ member }) {
  const memberUsername = member.tagged_name.split("#")[0];
  return (
    <div className="member-section">
      <MemberIconPopOut member={member} position={320} sidebar={true} />
      <h2>{memberUsername}</h2>
    </div>
  );
}
