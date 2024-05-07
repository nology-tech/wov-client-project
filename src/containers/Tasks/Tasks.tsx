import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";
import { useFirestore } from "../../hooks/useFireStore";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Task } from "../../types/Task";
import TaskTile from "../../components/TaskTile/TaskTile";

const Tasks = () => {
  const { getAllTasksAdmin } = useFirestore();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [displayTaskList, setDisplayTaskList] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasksAdmin().then((tempTaskList) => {
      setTaskList(tempTaskList);
      setDisplayTaskList(tempTaskList);
    });
  }, []);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tempSearchTerm = e.target.value;

    const tempDisplayTasklist = taskList.filter((task) => {
      const nameMatch = task.name
        .toLowerCase()
        .includes(tempSearchTerm.toLowerCase());

      const categoryMatch = task.category
        .toLowerCase()
        .includes(tempSearchTerm.toLowerCase());

      return nameMatch || categoryMatch;
    });
    setDisplayTaskList(tempDisplayTasklist);
  };

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
          onChange={handleTextInputChange}
        />
      </div>
      <div className="task-tile__container">
        {displayTaskList &&
          displayTaskList.map((task, index) => {
            return (
              <TaskTile
                key={index.toString()}
                name={task.name}
                requirement={task.description}
                category={task.category}
                points={task.points}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Tasks;
