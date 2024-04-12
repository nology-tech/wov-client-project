import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile } from "../../utils/mockData";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

export const Leaderboard = ({ users }: { users: UserProfile[] }) => {
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
        <Header subtitle="Leaderboard"/>
        <div className="leaderboard__cards">
        {sortUserByScore().map((user) => (
          <LeaderboardCard
            key={user.id} 
            name={user.name}
            profileImage={user.img ?? "./assets/images/default-profile-image.png"}
            totalScore={user.score}
          />
        ))};
        </div>
        <div className="leaderboard__navigation">
        <Navigation navActionIndex={3} />
        </div>
      </div>
    );
  };
  
  export default Leaderboard;
