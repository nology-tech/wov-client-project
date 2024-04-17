import { FormEvent } from "react";
import Button from "../Button/Button";
import "./Popup.scss";

type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
  descriptionShown: boolean;
  onButtonOne?: () => void;
  onButtonTwo?: () => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

const Popup = ({
  heading,
  labelButtonOne,
  labelButtonTwo,
  descriptionShown,
  onButtonOne,
  onButtonTwo,
  handleSubmit
}: PopupProps) => {


  return (
    <div className="popup">
      <form className="popup__container" onSubmit={handleSubmit}>
        <h2 className="popup__heading">{heading}</h2>
        {descriptionShown && (
          <>
            <div className="popup__description">
              <label htmlFor="popup__input" className="popup__label">
                Description:{" "}
              </label>
              <input
                type="text"
                name="popup__input"
                className="popup__input"
                placeholder="How did it go..."
              />
            </div>
          </>
        )}
        {/* <label htmlFor="image-upload">
          <Input
            id="image-upload"
            name="image-upload"
            type="file"
            required={true}
            inputProps={{ accept: "image/png, image/jpeg" }}
          />
          <Button variant="contained" component="span" color="primary">
            Upload Image
          </Button>
        </label> */}
        {!descriptionShown && (
          <Button
            label={labelButtonOne}
            variant="light-grey"
            onClick={onButtonOne}
          />
        )}
        {descriptionShown && (
          <label htmlFor="image-upload" className="add-media">
            <input
              type="file"
              name="image-upload"
              id="image-upload"
              accept="image/png, image/jpeg"
              className="custom"
            />
            ADD MEDIA
          </label>
          
        )}
        <Button
          label={labelButtonTwo}
          variant="primary"
          onClick={onButtonTwo}
        />
      </form>
    </div>
  );
};

export default Popup;
