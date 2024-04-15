import Button from "../Button/Button";
import "./Popup.scss";

type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
};

const Popup = ({ heading, labelButtonOne, labelButtonTwo }: PopupProps) => {
  return (
    <div className="popup">
      <h2 className="popup__heading">{heading}</h2>
      <Button label={labelButtonOne} variant="light-grey" />
      <Button label={labelButtonTwo} variant="primary" />
    </div>
  );
};

export default Popup;
