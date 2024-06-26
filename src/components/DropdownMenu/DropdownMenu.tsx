import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GroupData } from "../../types/Groups";

type DropdownMenuProps = {
  arrayOfGroups: GroupData[];
  handleChange: (event: SelectChangeEvent) => void;
  chosenTribe: string;
};

const DropdownMenu = ({
  arrayOfGroups,
  handleChange,
  chosenTribe,
}: DropdownMenuProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="tribe-input">Select Tribe</InputLabel>
        <Select
          labelId="tribe-input"
          id="tribe"
          value={chosenTribe}
          label="Select Tribe"
          onChange={handleChange}
        >
          {/* get tribe data from db, map over, create menu item for each one */}
          {arrayOfGroups.map((tribe, index) => {
            return (
              <MenuItem key={index} value={tribe.name}>
                {" "}
                {tribe.name}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMenu;
