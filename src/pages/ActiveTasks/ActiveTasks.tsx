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
      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;
