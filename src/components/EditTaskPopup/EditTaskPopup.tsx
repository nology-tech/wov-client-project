import { TextField } from "@mui/material";
import "./EditTaskPopup.scss";
import { ChangeEvent } from "react";
import { activeTasks } from "../../mockData/mockActiveTasks";
import Button from "../Button/Button";

type EditTaskPopupProps = {
handleInputValues: () => ChangeEvent<HTMLFormElement>
handleSubmit: () => void
};

const EditTaskPopup = ({handleInputValues, handleSubmit}: EditTaskPopupProps) => {

// const {type, taskHeading, category, points} = activeTasks;


  return (
    <div>
      <form action="" className="task-edit">
        <label htmlFor="">Name</label>
        <TextField id="name" 
          onChange={handleInputValues}
          />
        <label htmlFor="">Category</label>
        <TextField id="category" 
          onChange={handleInputValues}
          />
        <label htmlFor="">Frequency</label>
        <TextField id="frequency" 
          onChange={handleInputValues}
          />
        <label htmlFor="">Points</label>
        <TextField id="points" 
          onChange={handleInputValues}
          />
          <Button 
            label="Submit"
            onClick={handleSubmit}
          />
      </form>
    </div>
  );
};

export default EditTaskPopup;
