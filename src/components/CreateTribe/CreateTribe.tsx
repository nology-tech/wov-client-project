import "./CreateTribe.scss";
import Button from "../Button/Button";
import camera from "../../assets/images/camera-placeholder.png";
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";
import {
  FirestoreCollections,
  getDocumentFromFirestoreCollection,
  saveFileAndRetrieveDownloadUrl,
} from "../../utils/dbUtils";
import { TribeData } from "../../types/Tribes";

const CreateTribe = () => {
  const { createTribe } = useFirestore();
  const [tribeName, setTribeName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorExistingTribe, setErrorExistingTribe] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [tribeImage, setTribeImage] = useState<string>(camera);

  const checkMissingFields = () => {
    const missingFields = [];

    if (!tribeName.trim()) {
      missingFields.push("Tribe Name");
    }

    return missingFields;
  };

  const handleCreateTribe = async () => {
    setErrorMessage("");
    setsuccessMessage("");
    setErrorExistingTribe("");

    const missingFields = checkMissingFields();
    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(", ")}`);
      return;
    }

    const existingTribe = await getDocumentFromFirestoreCollection(
      FirestoreCollections.TRIBELIST,
      tribeName.trim()
    );

    if (existingTribe) {
      setErrorExistingTribe(
        "A tribe with this name already exists. Please choose a different name."
      );
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const tribeData: TribeData = {
      name: tribeName,
      startDate: today,
      image: tribeImage,
      numberOfMembers: 0,
      totalPoints: 0,
    };

    try {
      const result = await createTribe(tribeData);

      if (result.created) {
        setsuccessMessage("Your new tribe has been created!");
        clearInputValues();
      } else {
        setErrorMessage(result.error || "Error creating the tribe");
      }
    } catch (error) {
      setErrorMessage("Error creating the tribe");
    }
  };

  const clearInputValues = () => {
    setTribeName("");
    setTribeImage(camera);
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrorMessage("");
      setsuccessMessage("");
      setErrorExistingTribe("");
    };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let fileDownloadURL = await createImage(e.target.files[0]);
      fileDownloadURL = fileDownloadURL ?? camera;
      setTribeImage(fileDownloadURL);
    }
  };

  const createImage = async (tribeImgFile?: File) => {
    const tribeProfile = {
      img: "",
    };

    if (tribeImgFile) {
      const filePath = `tribes/images`;
      const { fileDownloadUrl, error } = await saveFileAndRetrieveDownloadUrl(
        filePath,
        tribeImgFile,
        true
      );

      if (error) {
        throw new Error(error);
      }
      tribeProfile.img = fileDownloadUrl || "";
      return fileDownloadUrl;
    }
  };

  return (
    <div className="create-tribe-container">
      <div className="create-tribe">
        <div className="create-tribe__new-tribe"></div>

        <div className="create-tribe__name text-field">
          <label htmlFor="tribe Name">Name</label>
          {errorMessage && errorMessage.includes("tribe Name") && (
            <p className="create-tribe__error">This is a required field</p>
          )}
          {errorExistingTribe && (
            <p className="create-tribe__error">{errorExistingTribe}</p>
          )}
          <input
            type="text"
            id="tribe Name"
            value={tribeName}
            onChange={handleInputChange(setTribeName)}
          />
        </div>

        <div className="create-tribe__media">
          <label htmlFor="file-input" className="create-tribe__upload">
            <img src={tribeImage} alt="Media" />
            <p>Media</p>
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleUpload}
            accept="image/*"
          />
        </div>

        {successMessage && (
          <p className="create-tribe__success">{successMessage}</p>
        )}
        <div className="create-tribe__create">
          <Button
            label="Create"
            variant="secondary"
            onClick={handleCreateTribe}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateTribe;
