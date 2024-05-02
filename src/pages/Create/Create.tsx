import "./Create.scss"
import Button from "../../components/Button/Button";
import CreateTask from "../../components/CreateTask/CreateTask";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import CreateGroup from "../../components/CreateGroup/CreateGroup";

const Create = () => {
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showCreateTask, setShowCreateTask] = useState<boolean>(true);

  const handleGroupButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowCreateGroup(true);
    setShowCreateTask(false);
  };

  const handleTaskButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowCreateGroup(false);
    setShowCreateTask(true);
  };

  return (
    <div>
      <Header subtitle="Create" />

      <div className="create">
        <Button
          label="New Group"
          variant={showCreateGroup ? "secondary" : "light-grey"} 
          onClick={handleGroupButtonClick}
        />
        <Button
          label="New Task"
          variant={showCreateTask ? "secondary" : "light-grey"}
          onClick={handleTaskButtonClick}
        />
      </div>

      <hr />

      {showCreateGroup && <CreateGroup />}
      {showCreateTask && <CreateTask buttonLabel="create" />}

      <NavigationAdmin navActionIndex={1} />
    </div>
  );
};

export default Create
