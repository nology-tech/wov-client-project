import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navigation.scss";
import Box from "@mui/material/Box";

type NavProps = {
  navActionIndex: number;
};

const Navigation = ({ navActionIndex = 0 }: NavProps) => {
  const [value, setValue] = useState(navActionIndex);
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigation
        className="bottom-navigation"
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          className="bottom-navigation__item"
          icon={<HomeIcon />}
          label="Home"
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Tasks"
          icon={<MapIcon />}
          component={Link}
          to="/tasks"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Calendar"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/calendar"
        />

        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Leaderboard"
          icon={<LeaderboardIcon />}
          component={Link}
          to="/leaderboard"
        />
          <BottomNavigationAction
          className="bottom-navigation__item"
          label="Create"
          icon={<LeaderboardIcon />}
          component={Link}
          to="/create"
        />
      </BottomNavigation>
    </Box>
  );
};
export default Navigation;
