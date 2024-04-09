import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";

const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Tasks" icon={<MapIcon />} />
        <BottomNavigationAction label="Calendar" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction
          label="Leaderboard"
          icon={<LeaderboardIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};
export default Navigation;
