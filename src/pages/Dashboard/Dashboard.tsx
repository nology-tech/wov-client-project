import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Tribes from "../../containers/Tribes/Tribes.tsx";
import Tasks from "../../containers/Tasks/Tasks.tsx";
import Users from "../../containers/Users/Users.tsx";
import "./DashBoard.scss";

const Dashboard = () => {
  const [showTribe, setShowTribe] = useState(true);
  const [showUser, setShowUser] = useState(false);
  const [showTask, setShowTask] = useState(false);

  return (
    <div className="dashboard">
      <Header subtitle={"Dashboard"} />
      <ButtonContainer
        setShowTribe={setShowTribe}
        setShowUser={setShowUser}
        setShowTask={setShowTask}
      />
      {showTribe && <Tribes />}
      {showUser && <Users />}
      {showTask && <Tasks />}
      <NavigationAdmin navActionIndex={0} />
    </div>
  );
};

export default Dashboard;
