import "./LeaderboardCard.scss"
import { capitalisedFirstLetters} from "../../utils/capitalisedFirstLetters"

type LeaderboardCardProps = {
    name: string;
    profileImage: string;
    totalScore : number;
};

const LeaderboardCard = ({name, profileImage, totalScore} : LeaderboardCardProps) => {

    const myName = capitalisedFirstLetters(name)

    return(
        <div className="leaderboard-card" >
            <div className="leaderboard-card__img-div">
            <img src={profileImage ?? "./assets/images/default-profile-image.png" }  className="leaderboard-card__img-div leaderboard-card__img-div--img"/>
            </div>
            <p className="leaderboard-card__name">{myName}</p>
            <div>
            <p data-testid="leaderboard__score" className="leaderboard-card__score">{totalScore}</p>
            </div>
        </div>
    )
}

export default LeaderboardCard
