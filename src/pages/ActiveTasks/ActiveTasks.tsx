import { useState, ChangeEvent, useEffect } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Navigation from "../../components/Navigation/Navigation";
import { Task } from "../../mockData/mockActiveTasks";
import "./ActiveTasks.scss";
import Header from "../../components/Header/Header";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type ActiveTasksItem = {
  [key: string]: boolean;
};

type ActiveTasksProp = {
  activeTasks: Task[];
};

const ActiveTasks = ({ activeTasks }: ActiveTasksProp) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const handleTaskCompletionChange = (id: string, isCompleted: boolean) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: isCompleted }));
  };

  const searchedTasks = taskArray.filter(
    (task) =>
      task.taskHeading.toLowerCase().includes(searchTerm) ||
      task.category?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="task-page" data-testid="task-page">
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
          role="search"
          onChange={handleTaskSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {searchedTasks.length === 0 ? (
        <p>There are no tasks to display</p>
      ) : (
        searchedTasks.map((task, index) => (
          <ActiveTaskTile
            key={task.id}
            id={task.id}
            requirement={task.taskHeading === "" ? "N/A" : task.taskHeading}
            category={task.category || ""}
            points={task.points}
            completed={!!completedTasks[task.id]}
            onCompletionChange={handleTaskCompletionChange}
            classModifier={
              index === searchedTasks.length - 1 && searchedTasks.length > 4
                ? "active-task active-task--last"
                : "active-task"
            }
          />
        ))
      )}

      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;
