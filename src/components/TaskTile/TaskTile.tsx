import "./TaskTile.scss";

type TaskTileProps = {
  id: string;
  name: string;
  requirement: string;
  category: string;
  points: number;
  handleEdit?: (taskName: string) => void;
};
const TaskTile = ({
  id,
  name,
  requirement,
  category,
  points,
  handleEdit,
}: TaskTileProps) => {
  return (
    <div key={id} className="task-tile">
      <h4 className="task-tile__name">{name}</h4>
      <p className="task-tile__category">
        {category} | {requirement}
      </p>
      <p className="task-tile__points">{points + " points"}</p>
      <button
        className="task-tile__editButton"
        onClick={handleEdit ? () => handleEdit(name) : undefined}
      >
        EDIT
      </button>
    </div>
  );
};
export default TaskTile;
