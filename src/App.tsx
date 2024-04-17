import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { UserProfile } from "./mockData/mockTribe";
import { app, db } from "./firebase";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTask as CompletedTaskType } from "./mockData/mockCompletedTasks";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { AuthProvider } from "./Provider/Provider";
import PrivateRoute from "./Provider/PrivateRoute";

const App = () => {
  const [userUID, setUserUID] = useState<null | string>(null);
  // NOTE: this console.log is used to workaround an eslint warning
  // It should be deleted once userUID is used
  console.log(userUID);

  const handleSetUserUID = (userUID: string) => {
    setUserUID(userUID);
  };
  const [fetchedTribe, setFetchedTribe] = useState<UserProfile[]>([]);

  const [date, setDate] = useState<Date>(new Date());
  const [completedTaskArray, setCompletedTaskArray] = useState<
    CompletedTaskType[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const tribeQuery = query(collection(db, "test-tribe"));
      const tribeDocs = await getDocs(tribeQuery);
      const tribeData: UserProfile[] = tribeDocs.docs.map(
        (doc) => doc.data() as UserProfile
      );
      setFetchedTribe(tribeData);
    };

    fetchUsers();
  }, []);

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
  console.log(fetchedTribe);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/sign-in"
            element={<Login setUserUID={handleSetUserUID} />}
          />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/" element={<PrivateRoute />}>
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
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
