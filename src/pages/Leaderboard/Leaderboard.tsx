import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile } from "../../types/User";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import { useFirestore } from "../../hooks/useFireStore";
import { useAuth } from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";

const Leaderboard = () => {
  const { getUser } = useAuth();
  const user = getUser();
  // takes a string where we can differentiate on tribes 
  const { getLeaderboard } = useFirestore();
  const [users, setUsers] = useState<UserProfile[]>([]);

  const getData = useCallback(async () => {
    const result = await getLeaderboard(user.tribe);
    setUsers(result);
  }, [getLeaderboard, user]);

  useEffect(() => {
    getData();
  }, [getData, user]);

  const sortUserByScore = () => {
    const sortedUsers = [...users.map((user) => ({ ...user }))].sort((a, b) => {
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }

      return (a.name || "").localeCompare(b.name || "");
    });
    return sortedUsers;
  };


  return (
    <div className="leaderboard">
      <Header subtitle="Leaderboard" profileImage={user.img} />
      <div className="leaderboard__cards">
        {sortUserByScore().map((sortedUser, index) => (
          <LeaderboardCard
            key={sortedUser.id + sortedUser.name}
            name={sortedUser.name}
            profileImage={
              sortedUser.img ? sortedUser.img : "./assets/images/default-profile-image.png"
            }
            totalScore={sortedUser.totalScore}
            isFirstCard={index === 0}
            userID={sortedUser.id}
            currentUserID={user.id}
          />
        ))}
        ;
      </div>
      <div className="leaderboard__navigation">
        <Navigation navActionIndex={4} />
      </div>
    </div>
  );
};

export default Leaderboard;
