import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Groups from "../../containers/Groups/Groups";
import groups from "../../mockData/groups";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import TaskTile from "../../components/TaskTile/TaskTile";
import { Task, activeTasks } from "../../mockData/mockActiveTasks";
import EditTaskPopup from "../../components/EditTaskPopup/EditTaskPopup";
import { FirestoreCollections, getCollectionFromFirestore } from "../../utils/dbUtils";
import { SetTask } from "../../types/Task";
import { MouseEventHandler } from "react";
import { MouseEvent } from "react";
import firebase from "firebase/compat/app";


const Dashboard = () => {
  const [groupClick, setGroupClick] = useState<boolean>(true);
  const [userClick, setUserClick] = useState<boolean>(false);
  const [taskClick, setTaskClick] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<SetTask>();
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<SetTask[]>()
  const [errorMessage, setErrorMessage] = useState<string>("");



  const handleGroupClick = () => {
    setGroupClick(true);
    setUserClick(false);
    setTaskClick(false);
  };

  const handleUserClick = () => {
    setUserClick(true);
    setGroupClick(false);
    setTaskClick(false);
  };

  const handleTaskClick = async () => {
    setTaskClick(true);
    setGroupClick(false);
    setUserClick(false);
    getSetTasks();
  };

  const getSetTasks = async () => {
  try {
    const setTasks: SetTask[] | null = await getCollectionFromFirestore (
      FirestoreCollections.TEST_TASKS
    )

    if(setTasks === null || setTasks === undefined){
      setErrorMessage("No set tasks have been found")
      return;
    }
    setAllTasks(setTasks)
    console.log(setTasks);
    
    console.log(allTasks);
    
    return setTasks;
    
  } catch(error) {
    setErrorMessage("Error fetching tasks");
  }
};

useEffect(() => {
getSetTasks();
console.log("I have been triggered");
}, [editedTask])





  const handleEdit = (task: SetTask) => (event: MouseEvent<HTMLButtonElement>) => {
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
    if (allTasks === undefined || editedTask === undefined) {
      return;
    }
    const findIndexOfTask = allTasks.findIndex(task => task.id === editedTask.id)
    allTasks.splice(findIndexOfTask,1,editedTask)
    setAllTasks([...allTasks]);

    console.log("updated task is ", allTasks)
    console.log("selected task", editedTask)

    firebase.database().ref("test-tasks").push(allTasks);

  };

  return (
    <div className="dashboard">
      <Header subtitle={"Dashboard"} />
      <ButtonContainer
        handleGroupClick={handleGroupClick}
        handleUserClick={handleUserClick}
        handleTaskClick={handleTaskClick}
        groupClick={groupClick}
        userClick={userClick}
        taskClick={taskClick}
      />
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
      {groupClick && <Groups groups={groups} />}

      {taskClick && allTasks &&
        allTasks.map((task) => (
          <TaskTile
            id={task.id}
            name={task.name}
            requirement={task.description}
            category={task.category}
            points={Number(task.points)}
            key={task.id}
            handleEdit={handleEdit(task)}
            editedTask={editedTask}
          />
        ))}

<>{console.log("all tasks is now " + allTasks)}</>
      {showEditPopup && (
        <EditTaskPopup
          handleInputValues={handleInputValues}
          handleSubmit={handleSubmit}
        />
      )}

      <NavigationAdmin navActionIndex={0} />
    </div>
  );
};

export default Dashboard;
