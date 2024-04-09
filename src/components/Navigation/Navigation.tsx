import Box from "@mui/material/Box";
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
          icon={
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.71 17.2901L18.71 2.29006C18.5226 2.10381 18.2692 1.99927 18.005 1.99927C17.7408 1.99927 17.4874 2.10381 17.3 2.29006L2.3 17.2901C2.13617 17.4814 2.05056 17.7274 2.06029 17.9791C2.07001 18.2308 2.17434 18.4695 2.35243 18.6476C2.53053 18.8257 2.76927 18.93 3.02094 18.9398C3.27262 18.9495 3.5187 18.8639 3.71 18.7001L18 4.41006L32.29 18.7101C32.4813 18.8739 32.7274 18.9595 32.979 18.9498C33.2307 18.9401 33.4695 18.8357 33.6476 18.6576C33.8257 18.4795 33.93 18.2408 33.9397 17.9891C33.9494 17.7374 33.8638 17.4914 33.7 17.3001L33.71 17.2901Z"
                fill="#CACBCD"
              />
              <path
                d="M28 32H23V22H13V32H8V18L6 20V32C6 32.5304 6.21071 33.0392 6.58579 33.4142C6.96086 33.7893 7.46957 34 8 34H15V24H21V34H28C28.5304 34 29.0391 33.7893 29.4142 33.4142C29.7893 33.0392 30 32.5304 30 32V19.76L28 17.76V32Z"
                fill="#CACBCD"
              />
            </svg>
          }
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Tasks"
          icon={<MapIcon />}
          component={Link}
          to="/Tasks"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Calendar"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/Calendar"
        />

        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Leaderboard"
          icon={<LeaderboardIcon />}
          component={Link}
          to="/Leaderboard"
        />
      </BottomNavigation>
    </Box>
  );
};
export default Navigation;
