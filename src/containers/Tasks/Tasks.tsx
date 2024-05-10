import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";
import { useFirestore } from "../../hooks/useFireStore";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "../../types/Task";
import TaskTile from "../../components/TaskTile/TaskTile";
import { MouseEvent } from "react";
import EditTaskPopup from "../../components/EditTaskPopup/EditTaskPopup";

const Tasks = () => {
  const { getAllTasksAdmin } = useFirestore();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [displayTaskList, setDisplayTaskList] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<Task>();
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<Task[]>()
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    getAllTasksAdmin().then((tempTaskList) => {
      setTaskList(tempTaskList);
      setDisplayTaskList(tempTaskList);
      console.log(tempTaskList);
      
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

  const handleEdit = (task: Task) => (event: MouseEvent<HTMLButtonElement>) => {
    // console.log(event);
    // console.log(task);
    setEditedTask(task);
    setShowEditPopup(true);
   };

   const handleInputValues = (event: ChangeEvent<HTMLFormElement>) => {
    console.log(event);
    console.log(editedTask);
    const {id, value} = event.target;
    const updatedTask = {...editedTask};
     if(!editedTask) {
      return;
     }
    
     if (id === "name") {
      updatedTask.name = value;
     }
     if (id === "category") {
      updatedTask.category = value;
     }
     if (id === "frequency") {
      updatedTask.category = value;
     }
     if (id === "points") {
      updatedTask.points = value;
     }
     setEditedTask(updatedTask);
     // const newTaskArr = allTasks.map((task) => task.id === updatedTask.id? updatedTask : task)
     // console.log(updatedTask.id)
    };

    const handleSubmit = () => {
      // what if only need to grab certain things from the form because it's a form event and tehn update those things
      setShowEditPopup(false);
      console.log("i have been triggered")
      if (displayTaskList === undefined || editedTask === undefined) {
       return;
      }

      const findIndexOfTask = displayTaskList.findIndex(task => task.name === editedTask.name)
      displayTaskList.splice(findIndexOfTask,1,editedTask)
      setAllTasks([...displayTaskList]);
      console.log("updated task is ", allTasks)
      console.log("selected task", editedTask)
      // firebase.database().ref("test-tasks").push(allTasks);
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
                handleEdit={handleEdit(task)}
                editedTask={editedTask}
              />
            );
          })}
            {showEditPopup && (
            <EditTaskPopup
            handleInputValues={handleInputValues}
            handleSubmit={handleSubmit}
            />
          )}
      </div>
    </div>
  );
};

export default Tasks;
