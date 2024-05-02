import "./CreateGroup.scss";
import Button from "../Button/Button";
import camera from "../../assets/images/camera-placeholder.png"
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";

const CreateGroup = () => {
    const { createGroup } = useFirestore();
    const [groupName, setGroupName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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

    const missingFields = checkMissingFields();
  
    const handleCreateGroup = async () => {
      if (groupName.trim() && missingFields.length === 0) {
        const groupData = {
          name: groupName,
          "start-date": startDate,
          "end-date": endDate,
        };
        setsuccessMessage("Your new tribe has been created!");
  
        try {
          await createGroup(groupData);
        } catch (error) {
          setErrorMessage("Error creating a group");
        }
      } else {
        setErrorMessage("Please fill in all required fields.");
      }
    };

    const clearInputValues = () => {
      setGroupName("");
      setStartDate("");
      setEndDate("");
    };

    if (successMessage) {
      clearInputValues()
    }
    

  return (
    <div className="create-group">
      <div className="create-group__new-group">
      </div> 

      
      <div className="create-group__name text-field">
        <label htmlFor="Group Name">Name</label>
        {errorMessage && <p className="create-group__error">{errorMessage}</p>}
        <input 
          type="text" 
          id="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          />
      </div>

      <section className="create-group__dates">
      <div className="create-group__start text-field">
        <label htmlFor="Start Date">Start Date</label>
        {errorMessage && <p className="create-group__error">{errorMessage}</p>}
        <input 
          type="date"
          id="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="create-group__end text-field">
        <label htmlFor="End Date">End Date</label>
        {errorMessage && <p className="create-group__error">{errorMessage}</p>}
        <input 
          type="date" 
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          />
      </div>
      </section>

      <div className="create-group__media">
        <img src={camera} alt="Media" />
        <p>Media</p>
       
      </div>
      {successMessage && <p className="create-group__success">{successMessage}</p>}
      <div className="create-group__create">
      <Button label="Create" variant="secondary" onClick={handleCreateGroup} />
      </div>
    </div>
  );
};
export default CreateGroup;


// validate end date so end date can't be BEFOREEEEE the start date
// get the page to clear when success message pops up