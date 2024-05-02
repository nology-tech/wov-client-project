import "./CreateGroup.scss";
import Button from "../Button/Button";
import camera from "../../assets/images/camera-placeholder.png";
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";
import {
  FirestoreCollections,
  getDocumentFromFirestoreCollection,
} from "../../utils/dbUtils";

const CreateGroup = () => {
  const { createGroup } = useFirestore();
  const [groupName, setGroupName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorExistingGroup, setErrorExistingGroup] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  const checkMissingFields = () => {
    const missingFields = [];

    if (!groupName.trim()) {
      missingFields.push("Group Name");
    }

    if (!startDate) {
      missingFields.push("Start Date");
    }

    if (!endDate) {
      missingFields.push("End Date");
    }

    return missingFields;
  };

  const today = new Date().toISOString().split("T")[0];

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

    const groupData = {
      name: groupName,
      "start-date": startDate,
      "end-date": endDate,
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
    setStartDate("");
    setEndDate("");
  };

  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrorMessage("");
      setsuccessMessage("");
      setErrorExistingGroup("");
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

        <section className="create-group__dates">
          <div className="create-group__start text-field">
            <label htmlFor="Start Date">Start Date</label>
            {errorMessage && errorMessage.includes("Start Date") && (
              <p className="create-group__error">This is a required field</p>
            )}

            <input
              className="date"
              type="date"
              id="Start Date"
              value={startDate}
              onChange={handleInputChange(setStartDate)}
              min={today}
              max={endDate}
            />
          </div>
          <div className="create-group__end text-field">
            <label htmlFor="End Date">End Date</label>
            {errorMessage && errorMessage.includes("End Date") && (
              <p className="create-group__error">This is a required field</p>
            )}
            <input
              className="date"
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleInputChange(setEndDate)}
              min={startDate || today}
            />
          </div>
        </section>

        <div className="create-group__media">
          <img src={camera} alt="Media" />
          <p>Media</p>
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
