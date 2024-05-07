import GroupTile from "../../components/GroupTile/GroupTile";
import { GroupData } from "../../mockData/groups";
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import "./Groups.scss";

type GroupsProps = {
  groups: GroupData[];
};

const Groups = ({ groups }: GroupsProps) => {
  return (
    <div className="group-component">
      <div className="search-bar">
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
          placeholder="Search by task, category"
          variant="outlined"
          role="search"
        />
      </div>
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
    </div>
  );
};

export default Groups;
