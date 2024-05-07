import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavigationAdmin.scss";
import Box from "@mui/material/Box";
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type NavAdminProps = {
  navActionIndex: number;
};

const NavigationAdmin = ({ navActionIndex = 0 }: NavAdminProps) => {
  const [value, setValue] = useState(navActionIndex);
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      {/* dashboard, reporting, calender, leaderboard // create for task dashboard */}
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
          label="Dashboard"
          icon={<HomeOutlinedIcon/>}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Create"
          icon={<AddOutlinedIcon/>}
          component={Link}
          to="/create"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Reporting"
          icon={<TimelineOutlinedIcon/>}
          component={Link}
          to="/reporting"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Calendar"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/calendar-admin"
        />
        <BottomNavigationAction
          className="bottom-navigation__item"
          label="Leaderboard"
          icon={<LeaderboardIcon />}
          component={Link}
          to="/leaderboard-admin"
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavigationAdmin;
