import Button from "../../components/Button/Button";
import "./ButtonContainer.scss";
import { Dispatch, SetStateAction, useState } from "react";


export type ButtonContainerProps = {
  setShowGroup: Dispatch<SetStateAction<boolean>>;
  setShowUser: Dispatch<SetStateAction<boolean>>;
  setShowTask: Dispatch<SetStateAction<boolean>>;
};

const ButtonContainer = ({ setShowGroup, setShowUser, setShowTask }: ButtonContainerProps) => {
  const [groupClick, setGroupClick] = useState<boolean>(false);
  const [userClick, setUserClick] = useState<boolean>(false);
  const [taskClick, setTaskClick] = useState<boolean>(false);

  const handleGroupClick = () => {
    setGroupClick(!groupClick);
    setUserClick(false);
    setTaskClick(false);
    setShowGroup(true);
    setShowUser(false);
    setShowTask(false);
  }

  const handleUserClick = () => {
    setUserClick(!userClick);
    setGroupClick(false);
    setTaskClick(false);
    setShowGroup(false);
    setShowUser(true);
    setShowTask(false);
  };

  const handleTaskClick = () => {
    setTaskClick(!taskClick);
    setGroupClick(false);
    setUserClick(false);
    setShowGroup(false);
    setShowUser(false);
    setShowTask(true);
  };

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
};

export default ButtonContainer;