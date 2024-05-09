import { Task } from "../../mockData/mockActiveTasks";
import "./TaskTile.scss";

type TaskTileProps = {
    id: string;
    name: string;
    requirement: string;
    category: string;
    points: number;
    handleEdit?: () => void;
    editedTask?: Task;
}

const TaskTile = ({id, name, requirement, category, points, handleEdit, editedTask} : TaskTileProps) => {
  
  return (
    <div key={id} className='task-tile'>
        <h4 className='task-tile__name'>{editedTask?.id === id ? editedTask.taskHeading : name}</h4>
        <p className='task-tile__category'>{editedTask?.id === id ? editedTask.category : category} | {editedTask?.id === id ? editedTask.type : requirement}</p>
        <p className='task-tile__points'>{editedTask?.id === id ? editedTask.points +  " points" : points +  " points"}</p>
        <button className='task-tile__editButton' onClick={handleEdit} >EDIT</button>
    </div>
  )
}
export default TaskTile;
