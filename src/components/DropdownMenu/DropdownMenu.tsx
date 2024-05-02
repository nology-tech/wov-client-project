import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type DropdownMenuProps = {
  arrayOfDropDownItems: string[];
  handleChange: (event: SelectChangeEvent) => void;
};

const DropdownMenu = ({arrayOfDropDownItems, handleChange} : DropdownMenuProps) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="tribe-input">Select Tribe</InputLabel>
        <Select
          labelId="tribe-input"
          id="tribe"
          value={arrayOfDropDownItems}
          label="Tribe"
          onChange={handleChange}
        >
          {/* get tribe data from db, map over, create menu item for each one */}
          <MenuItem>Test Tribe</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownMenu;
