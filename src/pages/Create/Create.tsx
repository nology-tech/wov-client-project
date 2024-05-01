import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import CreateTask from "../../components/CreateTask/CreateTask";
import { useState } from "react";

const Create = () => {
const [isTaskShowing, setIsTaskShowing] = useState<boolean>(true)
const handleFormChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  setIsTaskShowing(!isTaskShowing)
}
  return (
    <div>
        {isTaskShowing && true}
        <Button label="task" variant="secondary"></Button>
        <Button label="group" variant="light-grey" onClick={handleFormChange}></Button>
        <CreateTask buttonLabel="create"/>
        {isTaskShowing && false}
        <Button label="task" variant="light-grey" onClick={handleFormChange}></Button>
        <Button label="group" variant="secondary"></Button>
        <CreateTask buttonLabel="create"/>
    </div>
  )
}

export default Create
