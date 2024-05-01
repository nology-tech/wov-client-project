// import { CardMedia } from "@mui/material";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";

const CreateGroup = () => {


  return (
    <div>
      <Button 
      label="New Group"
      variant="secondary"
      />
      {/* underline here */}
      <div>
        <label htmlFor="">Name</label>
        <input type="text" />
      </div>
      <div className="Create__dates">
      <label htmlFor="">Start Date</label>
        <input type="text" />
        <label htmlFor="">End Date</label>
        <input type="text" />
      </div>
      <div>
        <img src="" alt="Media" />
        {/* <CardMedia /> */}
      </div>
      <Button 
      label="Create"
      variant="secondary"
      />
      <Navigation navActionIndex={4}/>
    </div>
  );
};

export default CreateGroup;