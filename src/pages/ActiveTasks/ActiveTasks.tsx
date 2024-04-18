import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import { app } from "../../firebase";
import { ActiveTask } from "../../types/Task";
import "./ActiveTasks.scss";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFireStore";
import { activeTasks as tasks } from "../../mockData/mockActiveTasks";

type ActiveTasksItem = {
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

type ActiveTaskData = {
  category: string;
  id: string;
  points: number;
  taskHeading: string;
  type: string;
  completed: string;
};

type ActiveTaskArray = ActiveTaskData[];

type CompletedTaskData = {
  category: string;
  completed: string;
  description: string;
  id: string;
  points: number;
  taskHeading: string;
  type: string;
};

const ActiveTasks = () => {
  const { getActiveTasks } = useFirestore();
  const [activeTasks, setActiveTasks] = useState<ActiveTask[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});
  const [popupTaskCompleted, setPopupTaskCompleted] = useState<boolean>(false);
  const [popupAddMedia, setPopupAddMedia] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getActiveTasks("OuZ1eeH9c5ZosgoXUi6Iraq7oM03");
      setActiveTasks(result);
    };
    getData();
  }, [getActiveTasks]);

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
        const activeTaskDoc = await getDoc(
          doc(db, "test-active-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03")
        );
        const activeTaskArray = activeTaskDoc.data() as ActiveTaskArray;

        if (activeTaskDoc.exists()) {
          const recentlyCompletedTask = activeTaskArray.activeTasks.find(
            (task: ActiveTaskData) => task.id === id
          );
          // TODO: Add dynamic date
          recentlyCompletedTask.completed = "12 April 2024 at 05:20:00 UTC+1";

          if (recentlyCompletedTask) {
            const completedTasksDoc = await getDoc(
              doc(db, "test-completed-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03")
            );

            if (completedTasksDoc.exists()) {
              const completedTasksData = completedTasksDoc.data()
                .completedTasks as CompletedTaskData[];

              const updatedCompleteTasks = [
                ...completedTasksData,
                recentlyCompletedTask,
              ];

              await setDoc(
                doc(db, "test-completed-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
                {
                  completedTasks: updatedCompleteTasks,
                }
              );
            }
          }

          // Remove active task
          const updatedActiveTasks = activeTasks.filter(
            (task) => task.id !== id
          );
          setActiveTasks(updatedActiveTasks);

          await setDoc(
            doc(db, "test-active-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
            {
              activeTasks: updatedActiveTasks,
            }
          );
        }

        const userRef = doc(db, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03");
        const userRefDoc = await getDoc(userRef);

        if (userRefDoc.exists()) {
          const userData: UserData = userRefDoc.data() as UserData;
          const updateScore = userData.totalScore + points;

          await updateDoc(
            doc(db, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
            {
              ...userData,
              totalScore: updateScore,
            }
          );
        }
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
      {searchedTasks.length === 0 ? (
        <p>There are no tasks to display</p>
      ) : (
        searchedTasks.map((task, index) => (
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
