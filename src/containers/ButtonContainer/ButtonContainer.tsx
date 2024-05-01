import { useState } from "react"
import Button from "../../components/Button/Button"
import "./ButtonContainer.scss"


const ButtonContainer = () => {
    const [groupClick, setGroupClick]= useState<boolean>(false)
    const [userClick, setUserClick]= useState<boolean>(false)
    const [taskClick, setTaskClick]= useState<boolean>(false)
    //const [fontWeight, setFontWeight]= useState<string>("lighter")


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
   <div className="buttons-container">

    <button className="buttons-container__group">
        {groupClick === true ? 
        <Button label={"Groups"} variant="secondary" onClick={handleGroupClick} /> :
        <Button label={"Groups"} variant="light-grey-lighter" onClick={handleGroupClick}/> 
         } 
    </button> 

    <button className="buttons-container__users">
        {userClick === true ?
        <Button label={"Users"} variant="secondary" onClick={handleUserClick}/> :
        <Button label={"Users"} variant="light-grey-lighter" onClick={handleUserClick} /> 
        }
    </button>

    <button className="buttons-container__tasks">
        {taskClick === true ? 
        <Button label={"Tasks"} variant="secondary" onClick={handleTaskClick}/> :
        <Button label={"Tasks"} variant="light-grey-lighter" onClick={handleTaskClick}/>
        }
    </button>
   </div>
  )
}

export default ButtonContainer


