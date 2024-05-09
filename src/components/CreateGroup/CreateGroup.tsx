import "./CreateGroup.scss";
import Button from "../Button/Button";
import camera from "../../assets/images/camera-placeholder.png";
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";
import {
  FirestoreCollections,
  getDocumentFromFirestoreCollection,
  saveFileAndRetrieveDownloadUrl,
} from "../../utils/dbUtils";

const CreateGroup = () => {
  const { createGroup } = useFirestore();
  const [groupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorExistingGroup, setErrorExistingGroup] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [groupImage, setGroupImage] = useState<string>(camera);

  const checkMissingFields = () => {
    const missingFields = [];

    if (!groupName.trim()) {
      missingFields.push("Group Name");
    }

    return missingFields;
  };

  const handleCreateGroup = async () => {
    setErrorMessage("");
    setsuccessMessage("");
    setErrorExistingGroup("");

    const missingFields = checkMissingFields();
    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(", ")}`);
      return;
    }

    const existingGroup = await getDocumentFromFirestoreCollection(
      FirestoreCollections.TRIBELIST,
      groupName.trim()
    );

    if (existingGroup) {
      setErrorExistingGroup(
        "This group already exists. Please choose a different name."
      );
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const groupData = {
      name: groupName,
      startDate: today,
      image: groupImage,
      numberOfMembers: 0,
      totalPoints: 0,
    };

    try {
      const result = await createGroup(groupData);

      if (result.created) {
        setsuccessMessage("Your new tribe has been created!");
        clearInputValues();
      } else {
        setErrorMessage(result.error || "Error creating the group");
      }
    } catch (error) {
      setErrorMessage("Error creating the group");
    }
  };

  const clearInputValues = () => {
    setGroupName("");
    setGroupImage(camera);
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrorMessage("");
      setsuccessMessage("");
      setErrorExistingGroup("");
    };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let fileDownloadURL = await createImage(e.target.files[0]);
      fileDownloadURL = fileDownloadURL ?? camera;
      setGroupImage(fileDownloadURL);
    }
  };

  const createImage = async (groupFile?: File) => {
    const groupProfile = {
      img: "",
    };

    if (groupFile) {
      const filePath = `groups/images`;
      const { fileDownloadUrl, error } = await saveFileAndRetrieveDownloadUrl(
        filePath,
        groupFile,
        true
      );

      if (error) {
        throw new Error(error);
      }
      groupProfile.img = fileDownloadUrl || "";
      return fileDownloadUrl;
    }
  };

  return (
    <div className="create-group-container">
      <div className="create-group">
        <div className="create-group__new-group"></div>

        <div className="create-group__name text-field">
          <label htmlFor="Group Name">Name</label>
          {errorMessage && errorMessage.includes("Group Name") && (
            <p className="create-group__error">This is a required field</p>
          )}
          {errorExistingGroup && (
            <p className="create-group__error">{errorExistingGroup}</p>
          )}
          <input
            type="text"
            id="Group Name"
            value={groupName}
            onChange={handleInputChange(setGroupName)}
          />
        </div>

        <div className="create-group__media">
          <label htmlFor="file-input" className="create-group__upload">
            <img src={groupImage} alt="Media" />
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
          <p className="create-group__success">{successMessage}</p>
        )}
        <div className="create-group__create">
          <Button
            label="Create"
            variant="secondary"
            onClick={handleCreateGroup}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateGroup;
