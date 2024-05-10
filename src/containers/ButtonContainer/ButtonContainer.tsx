import Button from "../../components/Button/Button";
import "./ButtonContainer.scss";
import { Dispatch, SetStateAction, useState } from "react";

export type ButtonContainerProps = {
  setShowTribe: Dispatch<SetStateAction<boolean>>;
  setShowUser: Dispatch<SetStateAction<boolean>>;
  setShowTask: Dispatch<SetStateAction<boolean>>;
};

const ButtonContainer = ({ setShowTribe, setShowUser, setShowTask }: ButtonContainerProps) => {
  const [tribeClick, setTribeClick] = useState<boolean>(false);
  const [userClick, setUserClick] = useState<boolean>(false);
  const [taskClick, setTaskClick] = useState<boolean>(false);

  const handleTribeClick = () => {
    setTribeClick(!tribeClick);
    setUserClick(false);
    setTaskClick(false);
    setShowTribe(true);
    setShowUser(false);
    setShowTask(false);
  }

  const handleUserClick = () => {
    setUserClick(!userClick);
    setTribeClick(false);
    setTaskClick(false);
    setShowTribe(false);
    setShowUser(true);
    setShowTask(false);
  };

  const handleTaskClick = () => {
    setTaskClick(!taskClick);
    setTribeClick(false);
    setUserClick(false);
    setShowTribe(false);
    setShowUser(false);
    setShowTask(true);
  };

  return (
    <div className="buttons-container">
      <Button
        label={"tribes"}
        variant={tribeClick ? "secondary" : "light-grey-lighter"}
        onClick={handleTribeClick}
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