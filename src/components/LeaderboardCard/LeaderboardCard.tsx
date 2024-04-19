import "./LeaderboardCard.scss";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";

type LeaderboardCardProps = {
  name: string;
  profileImage: string;
  totalScore: number;
  isFirstCard: boolean;
  currentUserID: string | null;
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

  return (
    <div
      className={`leaderboard-card ${
        isFirstCard ? "leaderboard-card--first" : ""
      } ${currentUserID === userID ? "leaderboard-card--current-user" : ""}`}
      data-testid="leaderboard-card"
    >
      <div className="leaderboard-card__img-div">
        <img
          src={profileImage ?? "./assets/images/default-profile-image.png"}
          className="leaderboard-card__img-div leaderboard-card__img-div--img"
        />
      </div>
      <p
        className={`leaderboard-card__name ${
          isFirstCard ? "leaderboard-card__name--first" : ""
        }`}
      >
        {myName}
      </p>
      <div>
        <p
          data-testid="leaderboard__score"
          className={`leaderboard-card__score ${
            isFirstCard ? "leaderboard-card__name--first" : ""
          }`}
        >
          {totalScore}
        </p>
      </div>
    </div>
  );
};
export default LeaderboardCard;
