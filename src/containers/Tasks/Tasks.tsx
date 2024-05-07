import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";
import { useFirestore } from "../../hooks/useFireStore";
import { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import TaskTile from "../../components/TaskTile/TaskTile";

const Tasks = () => {
  const { getAllTasksAdmin } = useFirestore();
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasksAdmin().then((tempTaskList) => {
      setTaskList(tempTaskList);
    });
  }, []);
  console.log(`this is the console log: ${taskList}`);
  console.log(taskList);

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
        {taskList &&
          taskList.map((task, index) => {
            return (
              <TaskTile
                id={index.toString()}
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
