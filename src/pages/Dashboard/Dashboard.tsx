import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Groups from "../../containers/Groups/Groups";
import Tasks from "../../containers/Tasks/Tasks";
import "./DashBoard.scss";

const Dashboard = () => {
  const [showGroup, setShowGroup] = useState(true);
  const [showTask, setShowTask] = useState(false);

  return (
    <div className="dashboard">
      <Header subtitle={"Dashboard"} />
      <ButtonContainer setShowGroup={setShowGroup} setShowTask={setShowTask} />
      {showGroup && <Groups />}
      {showTask && <Tasks />}
      <NavigationAdmin navActionIndex={0} />
    </div>
  );
};

export default Dashboard;
