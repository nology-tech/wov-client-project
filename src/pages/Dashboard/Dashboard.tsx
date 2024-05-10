import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Groups from "../../containers/Groups/Groups";
import Tasks from "../../containers/Tasks/Tasks.tsx";
import Users from "../../containers/Users/Users.tsx";
import "./DashBoard.scss";

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
