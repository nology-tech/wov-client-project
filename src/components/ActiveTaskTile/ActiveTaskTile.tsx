import { useState } from "react";
import "./ActiveTaskTile.scss";
type ActiveTaskTileProps = {
  requirement: string;
  category: string;
  points: number;
};
const ActiveTaskTile = ({
  requirement,
  category,
  points
}: ActiveTaskTileProps) => {
  const [completedTasks, setCompletedTasks] = useState<boolean>(false);

  const handleTaskCompletion = () => {
    setCompletedTasks(!completedTasks)
  }

  return (
    <div className="active-task" data-id="active-task">
      <div className="active-task__content">
        <label htmlFor="input-field">
          <h4 className="active-task__requirement">{requirement}</h4>
          <p className="active-task__category">{category}</p>
          <p className="active-task__points">{points} points</p>
        </label>
      </div>
      <input
        className="active-task__inputs"
        type="checkbox"
        checked={completedTasks}
        onChange={handleTaskCompletion}
      />
    </div>
  );
};
export default ActiveTaskTile;