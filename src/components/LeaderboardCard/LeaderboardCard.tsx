import "./LeaderboardCard.scss"
import fallbackProfile from "../../../public/assets/images/default-profile-image.png"

type LeaderboardCardProps = {
    name: string;
    profileImage: string;
    totalScore : number;
};

const LeaderboardCard = ({name, profileImage, totalScore} : LeaderboardCardProps) => {
    // Using RegEx, it capitalises the first letter of each word.
    const myName = name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).slice(0, 20);
   
   

    return(
        <div className="leaderboard-card">
            <img src={profileImage ?? fallbackProfile }  className="leaderboard-card__img"/>
            <p className="leaderboard-card__name">{myName}</p>
            <div>
            <h4 className="leaderboard-card__score">{totalScore}</h4>
            </div>
        </div>
    )
}

export default LeaderboardCard