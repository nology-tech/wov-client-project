import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Tasks.scss";
import { useFirestore } from "../../hooks/useFireStore";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "../../types/Task";
import TaskTile from "../../components/TaskTile/TaskTile";
import EditTaskPopup from "../../components/EditTaskPopup/EditTaskPopup";
import {
  getCollectionFromFirestore,
  FirestoreCollections,
} from "../../utils/dbUtils";

const Tasks = () => {
  const { getAllTasksAdmin } = useFirestore();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [displayTaskList, setDisplayTaskList] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<string>("");
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<Task[]>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { updateTasks } = useFirestore();

  useEffect(() => {
    getAllTasksAdmin().then((tempTaskList) => {
      setTaskList(tempTaskList);
      setDisplayTaskList(tempTaskList);
      console.log(tempTaskList);
    });
    getCollectionFromFirestore(FirestoreCollections.TEST_TASKS).then((data) => {
      console.log(data);
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

  const handleEdit = (taskName: string) => {
    // console.log(event);
    // console.log(task);
    setEditedTask(taskName);
    setShowEditPopup(true);
  };

  const handleInputValues = (event: ChangeEvent<HTMLFormElement>) => {
    console.log(event);
    console.log(editedTask);
    const { id, value } = event.target;
    const updatedTask = { ...editedTask };
    if (!editedTask) {
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

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    // what if only need to grab certain things from the form because it's a form event and tehn update those things
    setShowEditPopup(false);
    if (displayTaskList === undefined || editedTask === undefined) {
      return;
    }

    //this is to compare the task you have vs the orignal task
    // const selectedTask = taskList.filter((task) => task.name === event.target. )

    // now you have the event, from the form you can get each input's information and store as variable inside this function

    // then pass that information into the updateTasks function

    // just need to call the updatedoc with the new information
    // await updateDoc(doc(db, "test-tasks", selectedTask.id), {
    //   name : updatedTask.name
    // });

    // LEAVE THIS STUFF FOR NOW
    // const findIndexOfTask = displayTaskList.findIndex(task => task.name === editedTask.name)
    // displayTaskList.splice(findIndexOfTask,1,editedTask)
    // setAllTasks([...displayTaskList]);
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
                id={index.toString()}
                name={task.name}
                requirement={task.description}
                category={task.category}
                points={task.points}
                handleEdit={handleEdit}
                key={index.toString()}
              />
            );
          })}
        {showEditPopup && <EditTaskPopup handleSubmit={handleSubmit} />}
      </div>
    </div>
  );
};

export default Tasks;
