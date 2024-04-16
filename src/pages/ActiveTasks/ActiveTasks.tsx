import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import { app } from "../../firebase";
import { activeTasks } from "../../mockData/mockActiveTasks";
import "./ActiveTasks.scss";
import { useNavigate } from "react-router-dom";

type CompletedTasks = {
  [key: string]: boolean;
};

const db = getFirestore(app);

type UserData = {
  bio: string;
  email: string;
  id: string;
  img: string;
  name: string;
  totalScore: number;
};

const ActiveTasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({});
  const [popupTaskCompleted, setPopupTaskCompleted] = useState<boolean>(false);
  const [popupAddMedia, setPopupAddMedia] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
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
        const userRef = doc(db, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03");
        const userRefDoc = await getDoc(userRef);

        if (userRefDoc.exists()) {
          const userData: UserData = userRefDoc.data() as UserData;
          const updateScore = userData.totalScore + points;
          console.log(updateScore);

          await updateDoc(
            doc(db, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
            {
              ...userData,
              totalScore: updateScore,
            }
          );
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error updating totalScore", error);
      }

      // TODO: Hide when user presses outside the container/window.
    }
  };

  const handleGoToAddMediaPopup = () => {
    setPopupTaskCompleted(!popupTaskCompleted);
    setPopupAddMedia(!popupAddMedia)
  }

  const searchedTasks = activeTasks.filter(
    (task) =>
      task.taskHeading.toLowerCase().includes(searchTerm) ||
      task.category?.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="task-page" data-testid="task-page">
      <Header subtitle="Task" />
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
      {searchedTasks.map((task, index) => (
        <ActiveTaskTile
          key={task.id}
          id={task.id}
          requirement={task.taskHeading === "" ? "N/A" : task.taskHeading}
          category={task.category || ""}
          points={task.points}
          completed={!!completedTasks[task.id]}
          onCompletionChange={handleTaskCompletionChange}
          classModifier={
            index === searchedTasks.length - 1 && searchedTasks.length > 4
              ? "active-task active-task--last"
              : "active-task"
          }
        />
      ))}
      {popupTaskCompleted && (
        <Popup
          heading="Task Completed"
          labelButtonOne="ADD MEDIA"
          labelButtonTwo="VIEW LEADERBOARD"
          onButtonOne={handleGoToAddMediaPopup}
          onButtonTwo={() => navigate('/leaderboard')}
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
