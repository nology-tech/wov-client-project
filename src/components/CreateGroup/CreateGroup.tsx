import "./CreateGroup.scss";
// import { CardMedia } from "@mui/material";
import Button from "../Button/Button";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import camera from "../../assets/images/camera-placeholder.png"
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";

const CreateGroup = () => {
    const { createGroup } = useFirestore();
    const [groupName, setGroupName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const handleCreateGroup = async () => {
      if (groupName.trim()) {
        const groupData = {
          name: groupName,
          "start-date": startDate,
          "end-date": endDate,
        };
  
        try {
          await createGroup(groupData);
        } catch (error) {
          console.error("Error creating group:", error);
        }
      } else {
        console.warn("Group name cannot be empty.");
      }
    };

  return (
    <div className="create-group">
      <div className="create-group__new-group">
        <Button 
        label="New Group" 
        variant="secondary" 
        />
      </div> 

      {/* underline here */}
      <div className="create-group__name text-field">
        <label htmlFor="Group Name">Name</label>
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
        <input 
          type="date"
          id="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="create-group__end text-field">
        <label htmlFor="End Date">End Date</label>
        <input 
          type="date" 
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          />
      </div>
      </section>

      <div className="create-group__media">
        <img src={camera} alt="Media" />
        <p>Media</p>
        {/* <CardMedia /> or use an image tag????*/}
      </div>
      <div className="create-group__create">
      <Button label="Create" variant="secondary" onClick={handleCreateGroup} />

      </div>

      <NavigationAdmin navActionIndex={1} /> 
    </div>
  );
};
export default CreateGroup;