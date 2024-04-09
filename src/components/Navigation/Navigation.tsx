import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./Navigation.scss";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Navigation = () => {
  const [value, setValue] = useState(0);

  // allow the buttons to navigate on click
  // change colour when appropriate menu item is selected

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{ "& .MuiBottomNavigationAction-label": { color: "black" } }}
        />
        <BottomNavigationAction
          label="Tasks"
          icon={<MapIcon />}
          sx={{ "& .MuiBottomNavigationAction-label": { color: "black" } }}
        />
        <BottomNavigationAction
          label="Calendar"
          icon={<CalendarMonthIcon />}
          sx={{ "& .MuiBottomNavigationAction-label": { color: "black" } }}
        />
        <BottomNavigationAction
          label="Leaderboard"
          icon={<LeaderboardIcon />}
          sx={{ "& .MuiBottomNavigationAction-label": { color: "black" } }}
        />
      </BottomNavigation>
    </Box>
  );
};
export default Navigation;
