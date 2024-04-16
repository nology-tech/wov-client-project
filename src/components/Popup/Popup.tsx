import Button from "../Button/Button";
import "./Popup.scss";

type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
  description?: string;
  descriptionShown: boolean;
  onButtonOne?: () => void;
  onButtonTwo?: () => void;
};

const Popup = ({
  heading,
  labelButtonOne,
  labelButtonTwo,
  description,
  descriptionShown,
  onButtonOne,
  onButtonTwo
}: PopupProps) => {


  return (
    <div className="popup">
      <div className="popup__container">
        <h2 className="popup__heading">{heading}</h2>
        { descriptionShown &&
          <div className="popup__description">
            <label htmlFor="popup__input" className="popup__label">Description: </label>
            <input type="text" name="popup__input" className="popup__input" placeholder="How did it go..."/>
          </div>
        }
        <Button label={labelButtonOne} variant="light-grey" onClick={onButtonOne}/>
        <Button
          label={labelButtonTwo}
          variant="primary"
          onClick={onButtonTwo}
        />
      </div>
    </div>
  );
};

export default Popup;
