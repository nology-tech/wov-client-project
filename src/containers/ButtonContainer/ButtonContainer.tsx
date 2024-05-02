import { useState } from "react"
import Button from "../../components/Button/Button"
import "./ButtonContainer.scss"


const ButtonContainer = () => {
    const [groupClick, setGroupClick]= useState<boolean>(false)
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
    <div className="buttons-container">
      <button className="buttons-container__group">
         <Button  label={"groups"}  variant={groupClick ? "secondary" : "light-grey-lighter"} onClick={handleGroupClick} /> 
      </button>

      <button className="buttons-container__users">
      <Button label={"users"}  variant={userClick ? "secondary" : "light-grey-lighter"} onClick={handleUserClick} /> 
      </button>

      <button className="buttons-container__tasks">
        <Button  label={"tasks"}  variant={taskClick ? "secondary" : "light-grey-lighter"} onClick={handleTaskClick} /> 
      </button>
    </div>
  );
}

export default ButtonContainer

