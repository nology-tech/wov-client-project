// import { CardMedia } from "@mui/material";
import Button from "../Button/Button";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
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
    <div>
      <Button label="New Group" variant="secondary" />

      <div>
        <label htmlFor="groupName">Name</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="Create__dates">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="text"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">End Date</label>
        <input
          type="text"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <img src="" alt="Media" />
        {/* Placeholder for additional content */}
      </div>

      <Button label="Create" variant="secondary" onClick={handleCreateGroup} />

      <NavigationAdmin navActionIndex={1} />
    </div>
  );
};

export default CreateGroup;
