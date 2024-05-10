import "./Create.scss";
import Button from "../../components/Button/Button";
import CreateTask from "../../components/CreateTask/CreateTask";
import { useState } from "react";
import Header from "../../components/Header/Header";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import CreateTribe from "../../components/CreateTribe/CreateTribe";

const Create = () => {
  const [showCreateTribe, setShowCreateTribe] = useState<boolean>(false);
  const [showCreateTask, setShowCreateTask] = useState<boolean>(true);

  const handleTribeButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowCreateTribe(true);
    setShowCreateTask(false);
  };

  const handleTaskButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowCreateTribe(false);
    setShowCreateTask(true);
  };

  return (
    <div>
      <Header subtitle="Create" />

      <div className="create">
        <Button
          label="New Tribe"
          variant={showCreateTribe ? "secondary" : "light-grey"}
          onClick={handleTribeButtonClick}
        />
        <Button
          label="New Task"
          variant={showCreateTask ? "secondary" : "light-grey"}
          onClick={handleTaskButtonClick}
        />
      </div>

      <hr />

      {showCreateTribe && <CreateTribe />}
      {showCreateTask && <CreateTask buttonLabel="create" />}

      <NavigationAdmin navActionIndex={1} />
    </div>
  );
};

export default Create;
