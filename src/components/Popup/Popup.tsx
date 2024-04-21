//import { FormEvent, useState } from "react";
import Button from "../Button/Button";
import "./Popup.scss";

type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
  descriptionShown: boolean;
  onButtonOne?: () => void;
  onButtonTwo?: () => void;
  handleSubmit?: () => void;
  fileAdd?: (e: React.FormEvent<HTMLInputElement>) => void;
  addDescription?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Popup = ({
  heading,
  labelButtonOne,
  labelButtonTwo,
  descriptionShown,
  onButtonOne,
  onButtonTwo,
  handleSubmit,
  fileAdd,
  addDescription,
}: PopupProps) => {
  return (
    <div className="popup" data-testid="popup">
      <div className="popup__container">
        <h2 className="popup__heading">{heading}</h2>
        {descriptionShown && (
          <>
            <div className="popup__description">
              <label
                htmlFor="popup__input"
                className="popup__label"
                data-testid="description-label"
              >
                Description:
              </label>
              <input
                type="text"
                name="popup__input"
                className="popup__input"
                placeholder="How did it go..."
                onChange={addDescription}
              />
            </div>
          </>
        )}
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
              onInput={fileAdd}
            />
            ADD MEDIA
          </label>
        )}
        <Button
          label={labelButtonTwo}
          variant="primary"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Popup;
