import { useFirestore } from "../../hooks/useFireStore";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types/User";
import UserTile from "../../components/UserTile/UserTile";
import { InputAdornment, TextField } from "@mui/material"; 
import SearchIcon from "@mui/icons-material/Search";

const Users = () => {
    const { getAllUsersAdmin } = useFirestore();
    const [userList, setUserList] = useState<User[]>([]);
    const [displayUserList, setDisplayUserList] = useState<User[]>([]);

    useEffect(() => {
        getAllUsersAdmin().then((tempUserList) => {
        setUserList(tempUserList);
        setDisplayUserList(tempUserList);
        });
        // eslint-disable-next-line
    }, []);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSearchTerm = e.target.value;

    const tempDisplayUserlist = userList.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes(tempSearchTerm.toLowerCase());

      return nameMatch;
    });
    setDisplayUserList(tempDisplayUserlist);
  };

  return (
    <div className="users-component">
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
          placeholder="Search by user, category"
          variant="outlined"
          role="search"
          onChange={handleTextInputChange}
        />
      </div>
      <div className="user-tile__container">
        {displayUserList &&
          displayUserList.map((user, index) => {
            return (
              <UserTile
                key={index.toString()}
                image={user.image}
                name={user.name}
                points={user.points}
                tribe={user.tribe}
                memberSince={user.memberSince}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Users;

