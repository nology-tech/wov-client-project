import "./ActiveTaskTile.scss";

type ActiveTaskTileProps = {
  id: string;
  requirement: string;
  category: string;
  points: number;
  completed: boolean;
  onCompletionChange: (id: string, completed: boolean, points: number) => void;
  classModifier: string;
};

const ActiveTaskTile = ({
  id,
  requirement,
  category,
  points,
  completed,
  onCompletionChange,
  classModifier,
}: ActiveTaskTileProps) => {
  return (
    <div className={classModifier} data-testid="active-task">
      <div className="active-task__content">
        <label htmlFor="input-field">
          <h4 className="active-task__requirement">{requirement}</h4>
          <p className="active-task__category">{category}</p>
          <p className="active-task__points">{points} points</p>
        </label>
      </div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onCompletionChange(id, !completed, points)}
        className="active-task__inputs"
        data-testid="check-button"
      />
    </div>
  );
};

export default ActiveTaskTile;
