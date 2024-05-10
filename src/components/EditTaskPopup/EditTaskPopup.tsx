import { TextField } from "@mui/material";
import "./EditTaskPopup.scss";
import Button from "../Button/Button";
import { ChangeEvent } from "react";

type EditTaskPopupProps = {
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
};

const EditTaskPopup = ({ handleSubmit }: EditTaskPopupProps) => {
  return (
    <div>
      <form action="" className="task-edit" onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <TextField id="name" />
        <label htmlFor="">Category</label>
        <TextField id="category" />
        <label htmlFor="">Frequency</label>
        <TextField id="frequency" />
        <label htmlFor="">Points</label>
        <TextField id="points" />
        <Button label="Submit" />
      </form>
    </div>
  );
};

export default EditTaskPopup;
