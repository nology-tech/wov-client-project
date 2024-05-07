import GroupTile from "../../components/GroupTile/GroupTile";
import { GroupData } from "../../mockData/groups";
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import "./Groups.scss";
import { ChangeEvent, useState } from "react";

type GroupsProps = {
  groups: GroupData[];
};

const Groups = ({ groups }: GroupsProps) => {
const [displayGroupList, setDisplayGroupList] = useState<GroupData[]>(groups)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tempSearchTerm = event.target.value;
    
    const filteredDisplayGroupList = groups.filter((group) => {
      const nameMatch = group.tribeName.toLowerCase()
      .includes(tempSearchTerm.toLowerCase());

      return nameMatch
    })
    setDisplayGroupList(filteredDisplayGroupList);

  }

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
          onChange={handleInputChange}
        />
      </div>
      <div className="group-tile__container">
        {displayGroupList.map((group) => (
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
