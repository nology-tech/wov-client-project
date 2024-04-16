import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import { completedTasks } from "./mockData/mockCompletedTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Task } from "./mockData/mockActiveTasks";

const App = () => {
  const [activeTasksList, setActiveTasksList] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const db = getFirestore(app);
      const retrievalReference = doc(
        db,
        "test-active-tasks",
        "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"
      );
      const retrieveTasks = await getDoc(retrievalReference);
      if (retrieveTasks.exists()) {
        setActiveTasksList(retrieveTasks.data().activeTasks);
      }
    };
    getTasks();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tasks"
          element={<ActiveTasks activeTasks={activeTasksList} />}
        />
        <Route
          path="/calendar"
          element={<Calendar completedTasks={completedTasks} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard users={tribeUsers} />}
        />
        <Route path="/profile" element={<Profile user={tribeUsers[0]} />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/auth" element={<Account />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
