import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import "./UserCard.scss";

type UserCardProps = {
  name: string;
  img?: string;
  loginCount: number;
  isFirstCard: boolean;
  currentUserID: string | null;
  userID: string;
};

const UserCard = ({
  name,
  img,
  loginCount,
  isFirstCard,
  currentUserID,
  userID,
}: UserCardProps) => {
  const myName = capitalisedFirstLetters(name);

  return (
    <div
      className={`user-card ${isFirstCard ? "user-card--first" : ""} ${
        currentUserID === userID ? "user-card--current-user" : ""
      }`}
      data-testid="user-card"
    >
      <div className="user-card__img-div">
        <img
          src={img}
          className="user-card__img-div user-card__img-div--img"
        />
      </div>
      <p
        className={`user-card__name ${
          isFirstCard ? "user-card__name--first" : ""
        }`}
      >
        {myName}
      </p>
      <div>
        <p
          data-testid="user__login-count"
          className={`user-card__login-count ${
            isFirstCard ? "user-card__name--first" : ""
          }`}
        >
          {loginCount}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
