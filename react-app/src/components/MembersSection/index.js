import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadServerMembers } from "../../store/members";
import MemberSection from "./MemberSection";
import "./MemberSection.css";

export default function MembersSection() {
  const dispatch = useDispatch();
  const { serverId } = useParams();

  useEffect(() => {
    dispatch(loadServerMembers(serverId));
  }, [serverId, dispatch]);

  const serverMembers = useSelector((state) => Object.values(state.members));

  let allMembers;
  if (serverMembers) {
    allMembers = Object.values(serverMembers);
  }

  const memberComponents = allMembers?.map((member) => {
    return <MemberSection key={member.id} member={member} />;
  });

  return (
    <div className="members-section">
      <h2 className="members-title">Members</h2>
      {memberComponents}
    </div>
  );
}
