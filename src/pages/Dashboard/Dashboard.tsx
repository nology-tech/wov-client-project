import Header from "../../components/Header/Header"
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin"
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer"
// import Groups from "../../containers/Groups/Groups"
// import groups from "../../mockData/groups"
import TaskTile from "../../components/TaskTile/TaskTile"
import { activeTasks } from "../../mockData/mockActiveTasks"


const Dashboard = () => {
  return (
    <div>
      <Header subtitle={"Dashboard"}/>
      <ButtonContainer/>
      {/* <Groups groups={groups}/> */}
      <NavigationAdmin navActionIndex={0}/>

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
    </div>

   
  )
}

export default Dashboard;
