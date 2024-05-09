import GroupTile from "../../components/GroupTile/GroupTile";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Groups.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";
import { GroupData } from "../../types/Groups";

const Groups = () => {
  const {getAllGroupsAdmin} = useFirestore();
  const [groupList, setGroupList] = useState<GroupData[]>([]);
  const [displayGroupList, setDisplayGroupList] = useState<GroupData[]>([]);

  useEffect(() => {
    getAllGroupsAdmin().then((groups) => {
      setGroupList(groups);
      setDisplayGroupList(groups);
    });
    // eslint-disable-next-line
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
            key={group.tribeName}
            tribeName={group.tribeName}
            numberOfMembers={0}
            totalPoints={0}
            dateGroupStarted={group.startDate}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default Groups;
