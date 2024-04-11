import "./LeaderboardCard.scss"
import fallbackProfile from "../../../public/assets/images/default-profile-image.png"

type LeaderboardCardProps = {
    name: string;
    profileImage: string;
    totalScore : number;
};

const LeaderboardCard = ({name, profileImage, totalScore} : LeaderboardCardProps) => {
    // Using RegEx, it capitalises the first letter of each word in the user's name.
    const myName = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return(
        <div className="leaderboard-card">
            <div className="leaderboard-card__img-div">
            <img src={profileImage ?? fallbackProfile }  className="leaderboard-card__img-div leaderboard-card__img-div--img"/>
            </div>
            <p className="leaderboard-card__name">{myName}</p>
            <div>
            <p className="leaderboard-card__score">{totalScore}</p>
            </div>
        </div>
    )
}

export default LeaderboardCard