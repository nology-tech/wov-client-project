import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState, useEffect } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import { ActiveTask } from "../../types/Task";
import "./ActiveTasks.scss";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFireStore";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import dayjs from "dayjs";
import { db, storage } from "../../firebase";
import { UserProfile } from "../../types/User";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

type ActiveTasksItem = {
  [key: string]: boolean;
};

type ActiveTaskData = {
  category: string;
  id: string;
  points: number;
  taskHeading: string;
  type: string;
  completed: string;
};

type CompletedTaskData = {
  category: string;
  completed: string;
  description: string;
  id: string;
  points: number;
  taskHeading: string;
  type: string;
  imageUrl?: string;
};

type ActiveTasksProps = {
  currentUserId: string;
};

const ActiveTasks = ({ currentUserId }: ActiveTasksProps) => {
  const { getActiveTasks } = useFirestore();
  const [activeTasks, setActiveTasks] = useState<ActiveTask[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});
  const [score, setScore] = useState<number>();
  const [popupTaskCompleted, setPopupTaskCompleted] = useState<boolean>(false);
  const [popupAddMedia, setPopupAddMedia] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await getActiveTasks(`${currentUserId}`);
      setActiveTasks(result);
    };
    getData();
  }, [getActiveTasks]);

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const removeActiveTask = async (id: string) => {
    if (!activeTasks) {
      console.log("there are no tasks to remove");
      return;
    }
    const updatedActiveTasks = activeTasks.filter((task) => task.id !== id);
    setActiveTasks(updatedActiveTasks);

    await setDoc(doc(db, "test-active-tasks", currentUserId), {
      activeTasks: updatedActiveTasks,
    });
  };

  const updateUserScore = async (points: number) => {
    const userRef = doc(db, "test-tribe", currentUserId);
    const userRefDoc = await getDoc(userRef);

    if (!userRefDoc.exists()) {
      console.error("User document does not exist.");
      return;
    }

    const userData: UserProfile = userRefDoc.data() as UserProfile;
    const updateScore = userData.totalScore + points;

    await updateDoc(doc(db, "test-tribe", currentUserId), {
      ...userData,
      totalScore: updateScore,
    });
  };

  const updateCompletedTask = async (id: string, downloadUrl: string) => {
    const activeTaskDoc = await getDoc(
      doc(db, "test-active-tasks", currentUserId)
    );

    const activeTaskArray = activeTaskDoc.data()
      ?.activeTasks as ActiveTaskData[];

    if (!activeTaskDoc.exists()) {
      console.error("Active tasks document does not exist.");
      return;
    }

    const recentlyCompletedTask = activeTaskArray.find(
      (task: ActiveTaskData) => task.id === id
    );

    if (!recentlyCompletedTask) {
      console.error("Recently completed task does not exist.");
      return;
    }

    const today = new Date();
    recentlyCompletedTask.completed = dayjs(today).format(
      "D MMMM YYYY [at] HH:mm:ss [UTC]Z"
    );

    const convertedCompletedTask = {
      category: `${recentlyCompletedTask.category}`,
      completed: `${dayjs(today).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z")}`,
      description: descriptionText,
      id: id,
      points: `${recentlyCompletedTask.points}`,
      taskHeading: `${recentlyCompletedTask.taskHeading}`,
      type: `${recentlyCompletedTask.taskHeading}`,
      imageUrl: downloadUrl,
    };

    const completedTasksDoc = await getDoc(
      doc(db, "test-completed-tasks", currentUserId)
    );

    if (!completedTasksDoc.exists()) {
      console.error("Completed tasks document does not exist.");
      return;
    }

    const completedTasksData = completedTasksDoc.data()
      .completedTasks as CompletedTaskData[];

    const updatedCompleteTasks = [
      ...completedTasksData,
      convertedCompletedTask,
    ];

    await setDoc(doc(db, "test-completed-tasks", currentUserId), {
      completedTasks: updatedCompleteTasks,
    });

    removeActiveTask(id);
    setCompletedTasks({});
  };

  const handleTaskCompletionChange = async (
    id: string,
    isCompleted: boolean,
    points: number
  ) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: isCompleted }));
    setScore(points);
    if (isCompleted) {
      setPopupTaskCompleted(!popupTaskCompleted);
    }
  };

  const [file, setFile] = useState<File | undefined>();
  const [descriptionText, setDescriptionText] = useState<string>("");

  const handleGoToAddMediaPopup = () => {
    setPopupTaskCompleted(!popupTaskCompleted);
    setPopupAddMedia(!popupAddMedia);
  };

  let searchedTasks: ActiveTask[] = [];
  if (activeTasks) {
    searchedTasks = activeTasks.filter(
      (task) =>
        task.taskHeading.toLowerCase().includes(searchTerm) ||
        task.category?.toLowerCase().includes(searchTerm)
    );
  } else {
    searchedTasks = [];
  }

  const fileAdd = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log("target", target.files);
    setFile(target.files[0]);
    console.log("target", target.files[0]);
  };

  const addDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionText(e.target.value);
    console.log("description text:", e.target.value);
  };

  const submitTask = () => {
    if (typeof file === "undefined") return;
    if (typeof score === "undefined") return;

    const today = new Date();
    const date = dayjs(today).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z");

    const taskId = Object.keys(completedTasks)[0];

    console.log("reached");
    // upload file to folder
    const fileRef = ref(storage, `${currentUserId}/${taskId}-${date}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        try {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        } catch (error) {
          console.log(`${error} error`);
        }
      },
      async (error) => {
        console.log(`${error} error`);
      },
      async () => {
        try {
          console.log("success!!");
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          //await uploadToDatabase(downloadURL);
          await updateCompletedTask(taskId, downloadURL);
          await updateUserScore(score);
          console.log(downloadURL);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    );
    setPopupAddMedia(false);
  };

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
          fileAdd={fileAdd}
          addDescription={addDescription}
          handleSubmit={submitTask}
        />
      )}
      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;
