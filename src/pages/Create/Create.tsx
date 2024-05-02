import "./Create.scss"
import Button from "../../components/Button/Button";
import CreateTask from "../../components/CreateTask/CreateTask";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

const Create = () => {
const [isTaskShowing, setIsTaskShowing] = useState<boolean>(true)
const handleFormChange = async (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  setIsTaskShowing(!isTaskShowing)
}
  return (
    <div>
      <Header subtitle="Create"/>
        {
          isTaskShowing ? (
            <>
            <div className="create">
            <Button label="New Group" variant="light-grey" onClick={handleFormChange}></Button>
              <Button label="New Task" variant="secondary"></Button>
            </div>
            <hr/>
              <CreateTask buttonLabel="create"/>
            </>
          ) : (
            <>        
            <div className="create">
            <Button label="New Group" variant="secondary"></Button>
              <Button label="New Task" variant="light-grey" onClick={handleFormChange}></Button>
            </div>
            <hr/>
              <CreateTask buttonLabel="create"/>
            </>
          )
        }
        <Navigation navActionIndex={1}/>
    </div>
  )
}

export default Create
