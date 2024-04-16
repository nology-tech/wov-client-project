import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Popup.scss";

type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
  description?: string;
};

const Popup = ({
  heading,
  labelButtonOne,
  labelButtonTwo,
  description,
}: PopupProps) => {
  const navigate = useNavigate();

  return (
    <div className="popup">
      <div className="popup__container">
        <h2 className="popup__heading">{heading}</h2>
        <Button label={labelButtonOne} variant="light-grey" />
        <Button
          label={labelButtonTwo}
          variant="primary"
          onClick={() => navigate("/leaderboard")}
        />
      </div>
    </div>
  );
};

export default Popup;
