import { ChangeEvent, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Navigation from "../../components/Navigation/Navigation";
import tasks from "../../MockData/tasks";
import "./ActiveTasks.scss";
import Header from "../../components/Header/Header";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { InputAdornment } from "@mui/material";

const ActiveTasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchedInput = event.currentTarget.value.toLowerCase();
    setSearchTerm(searchedInput);
  };

  const searchedTasks = tasks.filter(
    (task) =>
      task.requirement.toLowerCase().includes(searchTerm) ||
      task.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="task-page">
      <Header subtitle="Task" />
      <label htmlFor="task-search" className="task-page__label">
        Search Bar
      </label>
      <div className="task-page__search-container">
        <TextField
          className="task-page__input"
          id="task-search"
          placeholder="Search by task, category"
          variant="outlined"
          onChange={handleTaskSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "30px",
              border: "1px solid #f0f0f0",
            },
            "& .MuiFormControl-root .MuiTextField-root .task-page__input": {
              width: "600px",
            },
            "& .MuiInputBase-input": {
              marginLeft: "20px",
            },
            "& .MuiInputBase-formControl": {
              fontFamily: "'Poppins', sans-serif",
              color: "#B1B8CF",
            },
          }}
        />
      </div>
      {searchedTasks.map((task, index) => (
        <ActiveTaskTile
          key={task.id}
          requirement={task.requirement}
          category={task.category}
          points={task.points}
          classModifier={
            index === searchedTasks.length - 1 && searchedTasks.length > 4
              ? "active-task active-task--last"
              : "active-task"
          }
        />
      ))}
      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;

// Notes
// - How data storing works, will real data have id
