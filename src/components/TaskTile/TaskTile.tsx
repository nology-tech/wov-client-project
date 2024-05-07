import "./TaskTile.scss";

type TaskTileProps = {
  name: string;
  requirement: string;
  category: string;
  points: number;
};

const TaskTile = ({ name, requirement, category, points }: TaskTileProps) => {
  return (
    <div className="task-tile">
      <h4 className="task-tile__name">{name}</h4>
      <p className="task-tile__category">
        {category} | {requirement}
      </p>
      <p className="task-tile__points">{points + " points"}</p>
      <button className="task-tile__editButton">EDIT</button>
    </div>
  );
};
export default TaskTile;
