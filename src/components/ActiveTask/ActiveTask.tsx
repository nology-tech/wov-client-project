import { ChangeEventHandler, useState } from "react";
import "./ActiveTask.scss";
type ActiveTaskProps ={
requirement: string;
category: string;
points: number;
handleTaskCompletion: ChangeEventHandler<HTMLInputElement>;
};
const ActiveTask = ({requirement, category, points, handleTaskCompletion} : ActiveTaskProps) => {
const [completedTasks, setCompletedTasks] = useState<boolean>(false);
  return (
    <div className = "active-task">
        <div className ="active-task__content">
            <label htmlFor="input-field" >
                <h4 className="active-task__requirement">{requirement}</h4>
                <div className = "active-task__subtext">
                    <p className="active-task__category" >{category}</p>
                    <p className = "active-task__points">{points} points</p>
                </div>
            </label>
        </div>
        <input className = "active-task__inputs"
            type="checkbox"
            checked={completedTasks}
            onChange={handleTaskCompletion}
        />
    </div>
  )
}
export default ActiveTask