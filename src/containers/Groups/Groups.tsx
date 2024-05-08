import GroupTile from "../../components/GroupTile/GroupTile";
// import { GroupData } from "../../mockData/groups";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Groups.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";

// type GroupsProps = {
//   groups: GroupData[];
// };

const Groups = () => {
  const { getAllGroupsAdmin } = useFirestore();
  const [groupList, setGroupList] = useState<any[]>([]);
  const [displayGroupList, setDisplayGroupList] = useState<any[]>([]);

  useEffect(() => {
    getAllGroupsAdmin().then((groups) => {
      setGroupList(groups);
      setDisplayGroupList(groups);
    });
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tempSearchTerm = event.target.value;

    const filteredDisplayGroupList = groupList.filter((group) => {
      const nameMatch = group.tribeName
        .toLowerCase()
        .includes(tempSearchTerm.toLowerCase());

      return nameMatch;
    });
    setDisplayGroupList(filteredDisplayGroupList);
  };

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
            key={group.name}
            tribeName={group.name}
            numberOfMembers={0}
            totalPoints={0}
            dateGroupStarted={0}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default Groups;
