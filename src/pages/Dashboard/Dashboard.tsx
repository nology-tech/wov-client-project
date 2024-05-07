//import Header from "../../components/Header/Header"
// import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin"
import {useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer"
import Groups from "../../containers/Groups/Groups"
import groups from "../../mockData/groups"
import TaskTile from "../../components/TaskTile/TaskTile"
import { activeTasks } from "../../mockData/mockActiveTasks"
import {tribeUsers} from "../../mockData/mockTribe.ts"
import UserTile from "../../components/UserTile/UserTile.tsx";

const Dashboard = () => {

  const [selectedDataType, setSelectedDataType] = useState<string>("");

  const handleButtonClick = (toRender : string) => {
    setSelectedDataType(toRender)
  }
      
  return (
    <div>
      {/* <Header subtitle={"Dashboard"}/> */}
      {/* <NavigationAdmin navActionIndex={0}/> */} 
      <ButtonContainer handleButtonClick = {handleButtonClick}/>
      {selectedDataType === "groups" && <Groups groups={groups} />}

      {selectedDataType === "users" && (
        <div className="user-tile__users">
          {tribeUsers.map((user) => (
            <UserTile
            image={user.img}
            name={user.name}
            points={user.totalScore}
            tribe="Test-Tribe"
            memberSince={2024}
            />
          ))}
        </div>
      )}

      {selectedDataType === "tasks" && ( 
      <div className="task-tile__Tasks">
        {activeTasks.map((task) => (
          <TaskTile 
          id={task.id} 
          name={task.taskHeading} 
          requirement={String(task.type)} 
          category={String(task.category)} 
          points={task.points} />
        ))}
      </div> 
      )}

    </div>
  )
}

export default Dashboard;
