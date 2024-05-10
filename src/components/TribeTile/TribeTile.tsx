import "./TribeTile.scss";

type TribeTileProps = {
  tribeName: string;
  numberOfMembers: number;
  totalPoints: number;
  dateTribeStarted: string;
};

const TribeTile = ({
  tribeName,
  numberOfMembers,
  totalPoints,
  dateTribeStarted,
}: TribeTileProps) => {
  const date = dateTribeStarted;

  return (
    <div className="tribe-tile__container">
      <div className="tribe-tile">
        <h3 className="tribe-tile__name">{tribeName}</h3>
        <p className="tribe-tile__members">Members: {numberOfMembers}</p>
        <h4 className="tribe-tile__points">Total Points: {totalPoints}</h4>
        <p className="tribe-tile__date">Date created: {date}</p>
      </div>
    </div>
  );
};

export default TribeTile;
