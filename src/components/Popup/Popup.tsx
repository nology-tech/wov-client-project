import { FormEvent, useState } from "react";
import Button from "../Button/Button";
import "./Popup.scss";
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase";


type PopupProps = {
  heading: string;
  labelButtonOne: string;
  labelButtonTwo: string;
  descriptionShown: boolean;
  onButtonOne?: () => void;
  onButtonTwo?: () => void;
  handleSubmit?: () => void;
};

const Popup = ({
  heading,
  labelButtonOne,
  labelButtonTwo,
  descriptionShown,
  onButtonOne,
  onButtonTwo,
  handleSubmit,
}: PopupProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [descriptionText, setDescriptionText] = useState<string>("");

  const fileAdd = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log("target", target.files);
    setFile(target.files[0]);
    console.log("target", target.files[0]);
  };

  const addDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionText(e.target.value);
    console.log("description text:", e.target.value);
  };

  // userId and taskId
  onButtonTwo = async (userId: string, taskId: string) => {
    const completedTasksDoc = await getDoc(
      doc(db, "test-completed-tasks", userId)
    );

    if (!completedTasksDoc.exists()) {
      console.error("Completed tasks document does not exist.");
      return;
    }

    const mostRecent = completedTasksDoc.data.completedTasks.length-1
    const taskToBeUpdated = completedTasksDoc.data().completedTasks[mostRecent]

    if (file) {
      taskToBeUpdated["mostRecentUrl"] = file.name
    }

    if (descriptionText) {
      taskToBeUpdated["description"] = descriptionText
    }

    
    await updateDoc(doc(db, "test-completed-tasks", `${userId}`), {
      completedTasks[mostRecent]: taskToBeUpdated
    })


    


  }

  return (
    <div className="popup" data-testid="popup">
      <form className="popup__container" onSubmit={handleSubmit}>
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
