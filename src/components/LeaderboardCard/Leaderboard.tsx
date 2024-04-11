import "./LeaderboardCard.scss"
import fallbackProfile from "../../../public/assets/images/default-profile-image.png"

type LeaderboardCardProps = {
    name: string;
    profileImage: string;
    totalScore : number;
};

const LeaderboardCard = ({name, profileImage, totalScore} : LeaderboardCardProps) => {
    return(
        <div className="leaderboard-card">
            <img src={profileImage ?? fallbackProfile }  className="leaderboard-card__img"/>
            <h4 className="leaderboard-card__name">{name}</h4>
            <h4 className="leaderboard-card__score">{totalScore}</h4>
        </div>
    )
}

export default LeaderboardCard