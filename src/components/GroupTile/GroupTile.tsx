
type GroupTileProps = {
    tribeName: string; 
    numberOfMembers: number;
    totalPoints: number;
    dateGroupStarted: Date;
}

const GroupTile = ({tribeName, numberOfMembers, totalPoints, dateGroupStarted}:GroupTileProps) => {

    const date = dateGroupStarted.toString()

  return (
    <div>
      <h1>{tribeName}</h1>
      <p>{numberOfMembers}</p>
      <h3>{totalPoints}</h3>
      <p>{date}</p>
    </div>
  )
}

export default GroupTile

