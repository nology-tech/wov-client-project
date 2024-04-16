import { useState, ChangeEvent, useEffect } from "react";
import ActiveTaskTile from "../../components/ActiveTaskTile/ActiveTaskTile";
import Navigation from "../../components/Navigation/Navigation";
import { activeTasks, Task } from "../../mockData/mockActiveTasks";
import "./ActiveTasks.scss";
import Header from "../../components/Header/Header";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { app } from "../../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

type ActiveTasksItem = {
  [key: string]: boolean;
};

type ActiveTickets = {
  category: string;
  id: string;
  points: number;
  taskHeading: string;
  type: string;
};

type CompletedTickets = {
  category: string;
  points: number;
  taskName: string;
};

const ActiveTasks = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<ActiveTasksItem>({});
  const [activeTasksList, setActiveTasksList] = useState<Task[]>([]);

  const handleTaskSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.toLowerCase());
  };

  const handleTaskCompletionChange = (id: string, isCompleted: boolean) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: isCompleted }));

    // handle task completion may require more information from active task tile.
  };

  // get list of active tasks
  // this works but needs adapting to consider different users
  // should take in a value for retrieval reference that is specific to the user
  useEffect(() => {
    const getTasks = async () => {
      const db = getFirestore(app);
      const retrievalReference = doc(
        db,
        "test-active-tickets",
        "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"
      );
      const retrieveTasks = await getDoc(retrievalReference);
      if (retrieveTasks.exists()) {
        console.log("Document data:", retrieveTasks.data());
        setActiveTasksList(retrieveTasks.data().activeTasks);
      } else {
        console.log("No such document!");
      }
    };
    getTasks();
    console.log("active tasks list", activeTasksList);
  }, []);

  // update completed tasks
  // should take in values regarding which ticket is being changed
  // and be called at the relevant moment
  // deletes and recreates document
  useEffect(() => {
    console.log("use effect accessed");
    const addCompletedTasks = async () => {
      const db = getFirestore(app);
      await setDoc(
        doc(db, "test-completed-tickets", "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"),
        {
          taskName: "5am Wake Up",
          category: "routine",
          // category isn't included in the request -> the
          // updated document will not include it in the database
          // entry
          points: 5,
        }
      );
    };
    addCompletedTasks();
  }, []);

  // update completed tasks
  // should take in values regarding which ticket is being changed
  // and be called at the relevant moment
  // deletes and recreates document
  useEffect(() => {
    console.log("use effect accessed");
    const addCompletedTasks = async () => {
      const db = getFirestore(app);
      await setDoc(
        doc(db, "test-completed-tickets", "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"),
        {
          taskName: "5am Wake Up",
          category: "routine",
          // category isn't included in the request -> the
          // updated document will not include it in the database
          // entry
          points: 5,
        }
      );
    };
    addCompletedTasks();
  }, []);

  const searchedTasks = activeTasksList.filter(
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
      <Navigation navActionIndex={1} />
    </div>
  );
};

export default ActiveTasks;
