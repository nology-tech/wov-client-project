import Button from "../../components/Button/Button";
import "./ButtonContainer.scss";

type ButtonContainerProps = {
  handleGroupClick: () => void;
  handleUserClick: () => void;
  handleTaskClick: () => void;
  groupClick: boolean;
  userClick: boolean;
  taskClick: boolean;
};

const ButtonContainer = ({
  handleGroupClick,
  handleUserClick,
  handleTaskClick,
  groupClick,
  userClick,
  taskClick,
}: ButtonContainerProps) => {
  

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
