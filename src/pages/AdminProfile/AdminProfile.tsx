import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import TaskTile from "../../components/TaskTile/TaskTile";
import { activeTasks } from "../../mockData/mockActiveTasks";
import "./AdminProfile.scss"

const AdminProfile = () => {
  const { logoutUser } = useAuth();
  // const { getActiveTasks, completeActiveTask } = useFirestore();

  return (
    <div>
      <h1>Profile</h1>
      <p>This is the admin profile</p>
      <div>
        <Button label={"SIGN OUT"} variant={"secondary"} onClick={logoutUser} />
      </div>
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
  );


};

export default AdminProfile;