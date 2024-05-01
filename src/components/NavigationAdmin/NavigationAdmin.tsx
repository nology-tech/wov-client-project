import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavigationAdmin.scss";
import Box from "@mui/material/Box";

type NavAdminProps = {
	navActionIndex: number;
}

const NavigationAdmin = ({navActionIndex = 0} : NavAdminProps) => {
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
	
	</Box>	
  )
}

export default NavigationAdmin