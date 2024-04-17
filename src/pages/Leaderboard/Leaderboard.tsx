import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile } from "../../Mockdata/mockTribe";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

const Leaderboard = ({ users }: { users: UserProfile[] }) => {
  const sortUserByScore = () => {
    const sortedUsers = [...users];
    const sortScore = sortedUsers.sort((a, b) => b.totalScore - a.totalScore);
    const sortScoreAndName = sortScore.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    return sortScoreAndName;
  };

  return (
    <div className="leaderboard">
      <Header subtitle="Leaderboard" />
      <div className="leaderboard__cards">
        {sortUserByScore().map((user) => (
          <LeaderboardCard
            key={user.id}
            name={user.name}
            profileImage={
              user.img ?? "./assets/images/default-profile-image.png"
            }
            totalScore={user.totalScore}
          />
        ))}
        ;
      </div>
      <div className="leaderboard__navigation">
        <Navigation navActionIndex={3} />
      </div>
    </div>
  );
};

export default Leaderboard;
