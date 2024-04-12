import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile, randomUserProfiles } from "../../utils/mockData";
import { Link } from "react-router-dom";

const Leaderboard= (users: UserProfile[]) => {
    // sort function to sort score from high to low
    // if score and name is the same (highly unlikely) alphabetical order.
    const sortUserByScore = () => {
        const sortScore = users.sort((a,b) => b.score - a.score);
        const sortScoreAndName = sortScore.sort((a,b) => {
            if(a.score === b.score){
                return a.name.localeCompare(b.name);
            }
            return 0;
        })
return sortScoreAndName
    }
   

    return(
        <div className="leaderboard">
            {sortUserByScore.map((user: { name: string; img: string; score: number; }) => {
                <LeaderboardCard name={user.name} profileImage={user.img} totalScore={user.score} />
            })}
        </div>
    )
}

export default Leaderboard;