import "./GroupTile.scss";

type GroupTileProps = {
  tribeName: string;
  numberOfMembers: number;
  totalPoints: number;
  dateGroupStarted: string;
};

const GroupTile = ({
  tribeName,
  numberOfMembers,
  totalPoints,
  dateGroupStarted,
}: GroupTileProps) => {
  const date = dateGroupStarted;

  return (
      <div className="group-tile">
        <h3 className="group-tile__name">{tribeName}</h3>
        <p className="group-tile__members">Members: {numberOfMembers}</p>
        <p className="group-tile__points">Total Points: {totalPoints}</p>
        <p className="group-tile__date">Date created: {date}</p>
        <button className="group-tile__editButton">EDIT</button>
      </div>
  );
};

export default GroupTile;
