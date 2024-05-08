import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";

type MostActiveCardProps = {
  name: string;
  img?: string;
  loginCount: number;
  isFirstCard: boolean;
  currentUserID: string | null;
  userID: string;
};

const MostActiveCard = ({
  name,
  img,
  loginCount,
  isFirstCard,
  currentUserID,
  userID,
}: MostActiveCardProps) => {
  const myName = capitalisedFirstLetters(name);

  return (
    <div
      className={`most-active-card ${
        isFirstCard ? "most-active-card--first" : ""
      } ${currentUserID === userID ? "most-active-card--current-user" : ""}`}
      data-testid="most-active-card"
    >
      <div className="most-active-card__img-div">
        <img
          src={img}
          alt={`Profile picture of ${myName}`}
          className="most-active-card__img-div--img"
        />
      </div>
      <p
        className={`most-active-card__name ${
          isFirstCard ? "most-active-card__name--first" : ""
        }`}
      >
        {myName}
      </p>
      <div>
        <p
          data-testid="most-active__login-count"
          className={`most-active-card__login-count ${
            isFirstCard ? "most-active-card__name--first" : ""
          }`}
        >
          {loginCount}
        </p>
      </div>
    </div>
  );
};

export default MostActiveCard;
