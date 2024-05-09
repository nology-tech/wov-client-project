import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Groups from "../../containers/Groups/Groups";
import Tasks from "../../containers/Tasks/Tasks.tsx";
import Users from "../../containers/Users/Users.tsx";
import "./DashBoard.scss";

// import groups from "../../mockData/groups"
// import { InputAdornment, TextField } from "@mui/material"
// import SearchIcon from "@mui/icons-material/Search";
// import TaskTile from "../../components/TaskTile/TaskTile"
// import { activeTasks } from "../../mockData/mockActiveTasks"
// import {tribeUsers} from "../../mockData/mockTribe.ts"
// import UserTile from "../../components/UserTile/UserTile.tsx";

const Dashboard = () => {
  const [showGroup, setShowGroup] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showTask, setShowTask] = useState(false);

  return (
    <div className="dashboard">
      <Header subtitle={"Dashboard"} />
      <ButtonContainer
        setShowGroup={setShowGroup}
        setShowUser={setShowUser}
        setShowTask={setShowTask}
      />
      {showGroup && <Groups />}
      {showUser && <Users />}
      {showTask && <Tasks />}
      <NavigationAdmin navActionIndex={0} />
    </div>
  );
};

export default Dashboard;
