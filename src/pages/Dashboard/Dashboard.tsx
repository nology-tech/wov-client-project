import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import Groups from "../../containers/Groups/Groups";
import groups from "../../mockData/groups";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./DashBoard.scss";
import { useState } from "react";
import TaskTile from "../../components/TaskTile/TaskTile";
import { Task, activeTasks } from "../../mockData/mockActiveTasks";
import EditTaskPopup from "../../components/EditTaskPopup/EditTaskPopup";

const Dashboard = () => {
  const [groupClick, setGroupClick] = useState<boolean>(true);
  const [userClick, setUserClick] = useState<boolean>(false);
  const [taskClick, setTaskClick] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<Task>();
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<Task[]>(activeTasks)

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

  const handleTaskClick = () => {
    setTaskClick(true);
    setGroupClick(false);
    setUserClick(false);
  };

  const handleEdit = (task: Task) => (event: MouseEvent) => {
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
        updatedTask.taskHeading = value;
      }
      if (id === "category") {
        updatedTask.category = value;
      }
      if (id === "frequency") {
        updatedTask.type = value;
      }
      if (id === "points") {
        updatedTask.points = value;
      }

      setEditedTask(updatedTask);


      const newTaskArr = activeTasks.map((task) => task.id === updatedTask.id? updatedTask : task)



      // console.log(updatedTask.id)
    };




  const handleSubmit = () => {
    // what if only need to grab certain things from the form because it's a form event and tehn update those things
    setShowEditPopup(false);
    const findIndexOfTask = activeTasks.findIndex(task => task.id === editedTask.id)
    activeTasks.splice(findIndexOfTask,1,editedTask)
    console.log("selected task", editedTask)
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

      {taskClick && filteredTasks &&
        filteredTasks.map((task) => (
          <TaskTile
            id={task.id}
            name={task.taskHeading}
            requirement={task.type ?? undefined}
            category={task.category}
            points={task.points}
            key={task.id}
            handleEdit={handleEdit(task)}
            editedTask={editedTask}
          />
        ))}

      {showEditPopup && (
        <EditTaskPopup
          handleInputValues={handleInputValues}
          handleSubmit={handleSubmit}
        />
      )}
      <>{console.log(showEditPopup)}</>
      <NavigationAdmin navActionIndex={0} />
    </div>
  );
};

export default Dashboard;
