import { useState } from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import { SelectChangeEvent } from "@mui/material";

const LeaderboardAdmin = () => {
  const [tribe, setTribe] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setTribe(event.target.value as string);
  };

  return (
    <div className="leaderboard-admin">
      {/* header */}
      <Header subtitle="Leaderboard" profileImage="user's img" />

      {/* drop down of tribes */}
      <DropdownMenu tribe={tribe} handleChange={handleChange} />

      {/* list of people and scores from selected tribe */}

      {/* leaderboard admin navigation */}
      <div>
        <NavigationAdmin navActionIndex={4} />
      </div>
    </div>
  );
};

export default LeaderboardAdmin;
