import GroupTile from "../../components/GroupTile/GroupTile";
import { GroupData } from "../../mockData/groups";
import "./Groups.scss";

type GroupsProps = {
  groups: GroupData[];
};

const Groups = ({ groups }: GroupsProps) => {
  return (
    <div className="group-tile__container">
      {groups.map((group) => (
        <GroupTile
          key={group.tribeName}
          tribeName={group.tribeName}
          numberOfMembers={group.numberOfMembers}
          totalPoints={group.totalPoints}
          dateGroupStarted={group.dateGroupStarted}
        />
      ))}
      ;
    </div>
  );
};

export default Groups;
