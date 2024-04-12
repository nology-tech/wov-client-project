import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile } from "../../utils/mockData";
import { Link } from "react-router-dom";

const Leaderboard = ({ users }: { users: UserProfile[] }) => {
    const sortUserByScore = () => {
      const sortedUsers = [...users];
      const sortScore = sortedUsers.sort((a, b) => b.score - a.score);
      const sortScoreAndName = sortScore.sort((a, b) => {
        if (a.score === b.score) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
      return sortScoreAndName;
    };
  
    return (
      <div className="leaderboard">
        {sortUserByScore().map((user) => (
          <LeaderboardCard
            key={user.id} 
            name={user.name}
            profileImage={user.img}
            totalScore={user.score}
          />
        ))}
      </div>
    );
  };
  
  export default Leaderboard;