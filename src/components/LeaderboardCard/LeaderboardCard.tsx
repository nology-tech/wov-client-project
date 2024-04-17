import "./LeaderboardCard.scss";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";

type LeaderboardCardProps = {
  name: string;
  profileImage: string;
  totalScore: number;
  isFirstCard: boolean;
  currentUserID: string;
  userID: string;
};

const LeaderboardCard = ({
  name,
  profileImage,
  totalScore,
  isFirstCard,
  currentUserID,
  userID,
}: LeaderboardCardProps) => {
  const myName = capitalisedFirstLetters(name);
  console.log(`key: ${userID} \nCurrent User ID: ${userID} `);

  return (
    <div
      className={`leaderboard-card ${
        isFirstCard ? "leaderboard-card--first" : ""
      } ${currentUserID === userID ? "leaderboard-card--current-user" : ""}`}
    >
      <div className="leaderboard-card__img-div">
        <img
          src={profileImage ?? "./assets/images/default-profile-image.png"}
          className="leaderboard-card__img-div leaderboard-card__img-div--img"
        />
      </div>
      <p className="leaderboard-card__name">{myName}</p>
      <div>
        <p data-testid="leaderboard__score" className="leaderboard-card__score">
          {totalScore}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardCard;
