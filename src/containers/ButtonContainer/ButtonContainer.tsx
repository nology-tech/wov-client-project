import { useState } from "react";
import Button from "../../components/Button/Button";
import "./ButtonContainer.scss";

export type ButtonContainerProps = {
  handleButtonClick: (toRender : string) => void;
}

const ButtonContainer = ({handleButtonClick} : ButtonContainerProps ) => {

  let [groupClick, setGroupClick] = useState<boolean>(false);
  let [userClick, setUserClick] = useState<boolean>(false);
  let [taskClick, setTaskClick] = useState<boolean>(false);

  console.log(groupClick, userClick, taskClick);

  const handleGroupClick = () =>  {

    setGroupClick(true);
    setUserClick(false);
    setTaskClick(false);
    handleButtonClick("groups");
  }

  const handleUserClick = () =>  {

    setUserClick(true);
    setGroupClick(false);
    setTaskClick(false);
    handleButtonClick("users");
  }

  const handleTaskClick = () =>  {

    setTaskClick(true);
    setGroupClick(false);
    setUserClick(false);
    handleButtonClick("tasks");
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

export default ButtonContainer;

 