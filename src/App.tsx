import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTask as CompletedTaskType } from "./mockData/mockCompletedTasks";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";

const App = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [completedTaskArray, setCompletedTaskArray] = useState<
    CompletedTaskType[]
  >([]);

  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };

  const getData = async () => {
    try {
      console.log("running");
      const db = getFirestore(app);
      const completedTask = doc(
        db,
        "test-completed-tasks",
        "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"
      );
      const completedTasksData = await getDoc(completedTask);
      if (completedTasksData.exists()) {
        const completedTaskArray = completedTasksData.data().completedTasks;
        setCompletedTaskArray(completedTaskArray);
      }
    } catch {
      console.log("Error: Could not locate Completed Tasks from database");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<ActiveTasks />} />
        <Route
          path="/calendar"
          element={
            <Calendar
              completedTasks={completedTaskArray}
              changeDate={changeDate}
              date={date}
            />
          }
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
