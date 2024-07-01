import "./TaskTile.scss";
import { Link } from "react-router-dom";

type TaskTileProps = {
  id: string,
  name: string;
  requirement: string;
  category: string;
  points: number;
};

const TaskTile = ({ id, name, requirement, category, points }: TaskTileProps) => {
  return (
    <div className="task-tile">
      <h4 className="task-tile__name">{name}</h4>
      <p className="task-tile__category">
        {category} | {requirement}
      </p>
      <p className="task-tile__points">{points + " points"}</p>
      <Link to={`/task/${id}`} className="task-tile__editButton">Info</Link>
    </div>
  );
};
export default TaskTile;
