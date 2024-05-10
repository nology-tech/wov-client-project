import TribeTile from "../../components/TribeTile/TribeTile";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tribes.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFireStore";
import { TribeData } from "../../types/Tribes";

const Tribes = () => {
  const {getAllTribesAdmin} = useFirestore();
  const [tribeList, setTribeList] = useState<TribeData[]>([]);
  const [displayTribeList, setDisplayTribeList] = useState<TribeData[]>([]);

  useEffect(() => {
    getAllTribesAdmin().then((tribes) => {
      setTribeList(tribes);
      setDisplayTribeList(tribes);
    });
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tempSearchTerm = event.target.value;

    const filteredDisplayTribeList = tribeList.filter((tribe) => {
      const nameMatch = tribe.name
        .toLowerCase()
        .includes(tempSearchTerm.toLowerCase());

      return nameMatch;
    });
    setDisplayTribeList(filteredDisplayTribeList);
  };


  return (
    <div className="tribe-component">
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
      <div className="tribe-tile__container">
        {displayTribeList.map((tribe) => (
          <TribeTile
            key={tribe.name}
            tribeName={tribe.name}
            numberOfMembers={0}
            totalPoints={0}
            dateTribeStarted={tribe.startDate}
          />
        ))}
        ;
      </div>
    </div>
  );
};

export default Tribes;
