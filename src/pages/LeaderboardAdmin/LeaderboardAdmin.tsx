import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";

const LeaderboardAdmin = () => {
  return (
    <div className="leaderboard-admin">
      {/* header */}
      <Header subtitle="Leaderboard" profileImage="user's img"/>

      {/* drop down of tribes */}

      {/* list of people and scores from selected tribe */}

      {/* leaderboard admin navigation */}
      <div>
        <NavigationAdmin navActionIndex={4} />
      </div>
    </div>
  );
}

export default LeaderboardAdmin