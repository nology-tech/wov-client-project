import { Button } from "@mui/material";
import Header from "../../components/Header/Header";
import Popup from "../../components/Popup/Popup";
import { Label } from "@mui/icons-material";

const CreateGroup = () => {


  return (
    <div>
      <Header subtitle="Create New Tribe"/>
      <div>
        <label htmlFor="">Tribe Name</label>
        <input type="text" />
      </div>

    </div>
  );
};

export default CreateGroup;
