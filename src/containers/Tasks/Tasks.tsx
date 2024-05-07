import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";
import { useFirestore } from "../../hooks/useFireStore";

const Tasks = () => {
  const { getAllTasksAdmin } = useFirestore();

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
        <button onClick={getAllTasksAdmin}>Press here for task list</button>
      </div>
    </div>
  );
};

export default Tasks;
