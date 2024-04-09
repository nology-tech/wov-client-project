import Box from "@mui/material/Box";
import "./Navigation.scss";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navigation.scss";

const Navigation = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%", position: "absolute", bottom: 0 }}>
      <BottomNavigation
        className="bottom-navigation"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Tasks"
          icon={<MapIcon />}
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Calendar"
          icon={<CalendarMonthIcon />}
        />
        <Link to={"/"}>
          <BottomNavigationAction
            className="bottom-navigation__item"
            label="Leaderboard"
            icon={<LeaderboardIcon />}
          />
        </Link>
      </BottomNavigation>
    </Box>
  );
};
export default Navigation;
