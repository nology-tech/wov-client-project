import "./UserTile.scss";

type UserTileProps = {
    image: string;
    name: string ;
    points: number
    tribe: string;
    memberSince: number;
}

const UserTile = ({ image, name, points, tribe, memberSince } : UserTileProps) => {

  return (
    <div className="user-tile">
      <img alt="profile Image" className="user-tile__image" src={image ?? "../../public/assets/images/default-profile-image.png"}/> 
      <div className="user-tile__info">
        <h4 className="user-tile__name">{"Name: " + name}</h4>
        <p className="user-tile__points">{"Points: " + points}</p>
        <p className="user-tile__tribe">{"Current Tribe: " + tribe}</p>
      </div>
      <p className="user-tile__memberSince">{"Member since: " + memberSince}</p>
    </div>
  )
}

export default UserTile;


