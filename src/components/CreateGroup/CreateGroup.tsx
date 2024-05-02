import "./CreateGroup.scss";
// import { CardMedia } from "@mui/material";
import Button from "../Button/Button";
import NavigationAdmin from "../NavigationAdmin/NavigationAdmin";
import camera from "../../assets/images/camera-placeholder.png"

const CreateGroup = () => {

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
        <label htmlFor="Name">Name</label>
        <input type="text" />
      </div>

      <section className="create-group__dates">
      <div className="create-group__start text-field">
        <label htmlFor="Start Date">Start Date</label>
        <input 
        type="date"
        />
      </div>
      <div className="create-group__end text-field">
        <label htmlFor="End Date">End Date</label>
        <input type="date" />
      </div>
      </section>

      <div className="create-group__media">
        <img src={camera} alt="Media" />
        <p>Media</p>
        {/* <CardMedia /> or use an image tag????*/}
      </div>
      <div className="create-group__create">
        <Button label="Create" variant="secondary" />
      </div>

      <NavigationAdmin navActionIndex={1} /> 
    </div>
  );
};

export default CreateGroup;
