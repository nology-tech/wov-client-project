import "./ActiveTasks.scss";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFireStore";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import { useAuth } from "../../hooks/useAuth";
import dayjs from "dayjs";
import { db } from "../../firebase";
import { ActiveTask } from "../../types/Task";
import { FirestoreCollections } from "../../utils/dbUtils";
import { collection, query, where, getDocs } from 'firebase/firestore'




type ActiveTasksItem = {
  [key: string]: boolean;
};

const ActiveTasks = () => {
  const { getUser, updateUser } = useAuth();
  const user = getUser();
  const { completeActiveTask } = useFirestore();
  const [ activeTasks, setActiveTasks] = useState<ActiveTask[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});
  const [popupTaskCompleted, setPopupTaskCompleted] = useState<boolean>(false);
  const [popupAddMedia, setPopupAddMedia] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(()=> {
    fetchActiveTasks()
  },
      // eslint-disable-next-line
  [])


  const fetchActiveTasks = async () => {
    try {
    // GET THE ACTIVE TASKS FOR THE USER BY QUERYING THE ACTIVE TASK COLLECTION
    const ActiveTaskRef = collection(db, FirestoreCollections.ACTIVE_TASKS)
    const queryActiveTasks = query(ActiveTaskRef, where("userId", "==", user.id ))
    const querySnapshotActiveTask = await getDocs(queryActiveTasks)   

   if(querySnapshotActiveTask.docs.length > 0){
    const activeTasksData = querySnapshotActiveTask.docs.map((doc)=> {
      return doc.data()
    });
    
    const todaysTask = activeTasksData.filter((task)=> {
      // this is funky couldn't work out a better way, works for now
      const taskDate = `${task.dateAssigned.toDate().getDay()}${task.dateAssigned.toDate().getMonth()}${task.dateAssigned.toDate().getFullYear()}`
      const todaysDate = `${dayjs().toDate().getDay()}${dayjs().toDate().getMonth()}${dayjs().toDate().getFullYear()}`
      if(taskDate === todaysDate) {
        return task
      }
    }) as ActiveTask[];
    
    setActiveTasks(todaysTask)
   }
    } catch (error) {
      console.error("Error fetching active tasks:", error);
    }
  }

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
    
    completeActiveTask(completedActiveTask);
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

  // not really active it's being used as a prop though so left it but makes no difference
  const searchedTasks = activeTasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm) ||
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
      {activeTasks.length === 0 ? (
        <p className="task-page__no-task-message">
          There are no tasks that fit your search.
        </p>
      ) : searchTerm ? searchedTasks.map((task, index) => {
        return !task.completed ? <ActiveTaskTile
          key={task.id}
          id={task.id}
          requirement={task.description === "" ? "N/A" : task.description}
          category={`${task.category || ""} | ${
            task.type ? capitalisedFirstLetters(task.type) : ""
          }`}
          points={task.points}
          completed={!!completedTasks[task.id]}
          onCompletionChange={handleTaskCompletionChange}
          classModifier={
            index === activeTasks.length - 1 && activeTasks.length > 4
              ? "active-task active-task--last"
              : "active-task"
          }
        /> : null})  : (
      activeTasks.map((task, index) => {
          return !task.completed ? <ActiveTaskTile
            key={task.id}
            id={task.id}
            requirement={task.description === "" ? "N/A" : task.description}
            category={`${task.category || ""} | ${
              task.type ? capitalisedFirstLetters(task.type) : ""
            }`}
            points={task.points}
            completed={!!completedTasks[task.id]}
            onCompletionChange={handleTaskCompletionChange}
            classModifier={
              index === activeTasks.length - 1 && activeTasks.length > 4
                ? "active-task active-task--last"
                : "active-task"
            }
          /> : null
})
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
