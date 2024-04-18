import "./Leaderboard.scss";
import LeaderboardCard from "../../components/LeaderboardCard/LeaderboardCard";
import { UserProfile } from "../../types/User";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFireStore";

type LeaderboardProps = {
  users: UserProfile[];
  currentUserID: string;
};

const Leaderboard = ({ users, currentUserID }: LeaderboardProps) => {
  const sortUserByScore = () => {
    const sortedUsers = [...users];
    const sortScore = sortedUsers.sort((a, b) => b.totalScore - a.totalScore);
    const sortScoreAndName = sortScore.sort((a, b) => {
      if (a.totalScore === b.totalScore) {
        if (!a.name) return 1;
        if (!b.name) return -1;
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
        {sortUserByScore().map((user, index) => (
          <LeaderboardCard
            key={user.id}
            name={user.name}
            profileImage={
              user.img ?? "./assets/images/default-profile-image.png"
            }
            totalScore={user.totalScore}
            isFirstCard={index === 0}
            currentUserID={currentUserID}
            userID={user.id}
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
