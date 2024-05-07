import "./ActiveTasks.scss";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFireStore";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import { useAuth } from "../../hooks/useAuth";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

type ActiveTasksItem = {
  [key: string]: boolean;
};

const ActiveTasks = () => {
  const { getUser, updateUser } = useAuth();
  const user = getUser();
  const { getActiveTasks, completeActiveTask } = useFirestore();
  const activeTasks = getActiveTasks(user.id);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});
  const [popupTaskCompleted, setPopupTaskCompleted] = useState<boolean>(false);
  const [popupAddMedia, setPopupAddMedia] = useState<boolean>(false);
  const [popupAddVideo, setpopupAddVideo] = useState<boolean>(false);
  const [showUploadPrompt, setShowUploadPrompt] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null >(null);
  const navigate = useNavigate();

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const updateUserScore = async (points: number) => {
    const updateScore = Number(user.totalScore) + Number(points);
    updateUser({ totalScore: updateScore });
  };

  const updateCompletedTask = async (id: string) => {
    const completedActiveTask = activeTasks.find((task) => task.id === id);

    if (!completedActiveTask) {
      console.error("Recently completed task does not exist.");
      return;
    }

    completeActiveTask(user, completedActiveTask);
  };

  const handleTaskCompletionChange = async (
    id: string,
    isCompleted: boolean,
    points: number
  ) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: isCompleted }));
    if (isCompleted) {
      setPopupTaskCompleted(!popupTaskCompleted);

      try {
        updateCompletedTask(id);
        updateUserScore(points);
      } catch (error) {
        console.error("An error has occurred: ", error);
        throw error;
      }
    }
  };

  const handleGoToAddMediaPopup = () => {
    setPopupTaskCompleted(!popupTaskCompleted);
    setPopupAddMedia(!popupAddMedia);
  };

  const handlePopupVideo = () => {
    setpopupAddVideo(!popupAddVideo);
  };


  const handleShowUploadPrompt = () => {
    setShowUploadPrompt(prevState => !prevState);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      setSelectedFile(file);
      console.log(file)
    }
    console.log(event);
  };

  const searchedTasks = activeTasks.filter(
    (task) =>
      task.taskHeading.toLowerCase().includes(searchTerm) ||
      task.category?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="task-page" data-testid="task-page">
      <Header subtitle="Task" profileImage={user.img} />
      <label htmlFor="task-search" className="task-page__label">
        Search Bar
      </label>
      <div className="task-page__search-container">
        <TextField
          className="task-page__input"
          id="task-search"
          placeholder="Search by task, category"
          variant="outlined"
          role="search"
          onChange={handleTaskSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {searchedTasks.length === 0 ? (
        <p className="task-page__no-task-message">
          There are no tasks that fit your search.
        </p>
      ) : (
        searchedTasks.map((task, index) => (
          <ActiveTaskTile
            key={task.id}
            id={task.id}
            requirement={task.taskHeading === "" ? "N/A" : task.taskHeading}
            category={`${task.category || ""} | ${
              task.type ? capitalisedFirstLetters(task.type) : ""
            }`}
            points={task.points}
            completed={!!completedTasks[task.id]}
            onCompletionChange={handleTaskCompletionChange}
            classModifier={
              index === searchedTasks.length - 1 && searchedTasks.length > 4
                ? "active-task active-task--last"
                : "active-task"
            }
          />
        ))
      )}

      {popupTaskCompleted && (
        <Popup
          heading="Task Completed"
          labelButtonOne="ADD MEDIA"
          labelButtonTwo="VIEW LEADERBOARD"
          onButtonOne={handleGoToAddMediaPopup}
          onButtonTwo={() => navigate("/leaderboard")}
          descriptionShown={false}
        />
      )}
      {popupAddMedia && (
        <Popup
          heading="ADD MEDIA"
          labelButtonOne="ADD PHOTOS"
          labelButtonTwo="UPDATE TASK"
          descriptionShown={true}
        />
      )}
      <>
      <CompletedTask 
        taskHeading="fake task"
        category="fitness"
        points={10}
        description="blah"
        image={selectedFile}
      />
      </>

      <div>
        <button onClick={handlePopupVideo}>Add Video</button>
        {popupAddVideo && (
          <>
              {/* { <input 
              type="file" 
              // onChange={handleFileInputChange}  
            /> } */}

            <Popup
              heading=""
              labelButtonOne="ADD A VIDEO"
              labelButtonTwo="CANCEL"
              onButtonOne={() => handleShowUploadPrompt()}
              onButtonTwo={handlePopupVideo}
              descriptionShown={true}
            />
          </>
        )}
        
        <div>
       
          {showUploadPrompt && 
            <input 
              type="file" 
              id="file"
              name="file"
              onChange={handleFileInputChange} 
             
            />}
            <>{console.log(selectedFile)}</>
        </div>
      </div>
      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;
