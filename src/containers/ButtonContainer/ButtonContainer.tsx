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
      <Button
        label={"groups"}
        variant={groupClick ? "secondary" : "light-grey-lighter"}
        onClick={handleGroupClick}
        size="small"
      />

        <Button
          label={"users"}
          variant={userClick ? "secondary" : "light-grey-lighter"}
          onClick={handleUserClick}
          size="small"
        />

        <Button
          label={"tasks"}
          variant={taskClick ? "secondary" : "light-grey-lighter"}
          onClick={handleTaskClick}
          size="small"
        />
    </div>
  );
}

export default ButtonContainer

