import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";
import TaskTile from "../../components/TaskTile/TaskTile";
import { Task } from "../../mockData/mockActiveTasks";

type TasksProp = {
  tasks: Task[];
}

const AdminDashboard = ({ tasks } : TasksProp) => {
  const { logoutUser } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This is the admin dashboard</p>
      <div>
        <Button label={"SIGN OUT"} variant={"secondary"} onClick={logoutUser} />
      </div>
      <div className="task-tile__Tasks">
        {tasks.map((task) => (
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

export default AdminDashboard;
