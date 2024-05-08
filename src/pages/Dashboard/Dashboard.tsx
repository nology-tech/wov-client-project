import Header from "../../components/Header/Header"
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin"
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer"
import Groups from "../../containers/Groups/Groups"
import groups from "../../mockData/groups"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import "./DashBoard.scss"
import { useState } from "react"
import TaskTile from "../../components/TaskTile/TaskTile"
import ActiveTasks from "../ActiveTasks/ActiveTasks"
import { activeTasks } from "../../mockData/mockActiveTasks"



const Dashboard = () => {
  const [groupClick, setGroupClick]= useState<boolean>(true)
  const [userClick, setUserClick]= useState<boolean>(false)
  const [taskClick, setTaskClick]= useState<boolean>(false)

  const handleGroupClick = () =>  {
      setGroupClick(!groupClick)
      setUserClick(false)
      setTaskClick(false)
  }

  const handleUserClick = () =>  {
      setUserClick(!userClick)
      setGroupClick(false)
      setTaskClick(false)
  }
  const handleTaskClick = () =>  {
      setTaskClick(!taskClick)
      setGroupClick(false)
      setUserClick(false)
  }
  
  return (
    <div className="dashboard">
        <Header subtitle={"Dashboard"}/>
        <ButtonContainer
          handleGroupClick={handleGroupClick}
          handleUserClick={handleUserClick}
          handleTaskClick={handleTaskClick}
          groupClick={groupClick}
          userClick={userClick}
          taskClick={taskClick}

        />
        <div className="search-bar">
          <TextField fullWidth  
          InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              ),
            }}
          placeholder="Search by task, category" variant="outlined" role="search" />
        </div>
        {
          groupClick && (
            <Groups groups={groups}/>
          )
        }

        {
          taskClick && (
            activeTasks.map((task) => (
              <TaskTile 
                id={task.id}
                name={task.taskHeading}
                requirement={task.type ?? undefined}
                category={task.category}
                points={task.points}
              />
            )
          )
        )}
        
        <NavigationAdmin navActionIndex={0}/>
      
    </div>
  )
}

export default Dashboard
