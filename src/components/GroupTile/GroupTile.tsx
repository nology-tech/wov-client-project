import "./GroupTile.scss"

type GroupTileProps = {
    tribeName: string; 
    numberOfMembers: number;
    totalPoints: number;
    dateGroupStarted: string;
}

const GroupTile = ({tribeName, numberOfMembers, totalPoints, dateGroupStarted}:GroupTileProps) => {

    const date = dateGroupStarted.toString()

  return (
    <div className="group-tile__container">
    <div className="group-tile">
      <h3 className="group-tile__name">{tribeName}</h3>
      <p className="group-tile__members">Members: {numberOfMembers}</p>
      <h4 className="group-tile__points">Total Points:  {totalPoints}</h4>
      <p className="group-tile__date">Date created: {date}</p>
    </div>
    </div>
  )
}

export default GroupTile

