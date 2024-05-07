import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";



const Tasks = () => {
  return (
    <div className="tasks-component">
      <div className="search-bar">
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
          placeholder="Search by task, category"
          variant="outlined"
          role="search"
        />
      </div>
      <div className="task-tile__container">
        <p>Tasks</p>
      </div>
    </div>
  );
};

export default Tasks;
