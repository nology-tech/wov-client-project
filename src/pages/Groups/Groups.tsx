import { GroupData } from "../../mockData/groups"

type GroupsProps = {
    groups: GroupData[];
}

const Groups = ({groups}: GroupsProps) => {
  return (
    <div>
        {groups.map((group) => (
            <h1>{group.tribeName}</h1>
        ))};
    </div>
  )
}

export default Groups
