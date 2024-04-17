import { Route, Routes} from "react-router-dom";
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

// TODO: REMOVE
// import { signOut } from "firebase/auth";

const App = () => {
  // TODO: REMOVE
  // signOut(auth);
  // localStorage.clear();

  const [fetchedTribe, setFetchedTribe] = useState<UserProfile[]>([]);
  //TODO: REMOVE WHEN fetchedTribe IS USED
  console.log(fetchedTribe)

  const [date, setDate] = useState<Date>(new Date());
  const [completedTaskArray, setCompletedTaskArray] = useState<
    CompletedTaskType[]
  >([]);


  const [userUID, setUserUID] = useState<string | null>(null)
  //TODO: REMOVE WHEN userUID IS USED THX
  console.log(userUID)

  useEffect(()=> {
    const localStorageUID = localStorage.getItem("userUID")
    setUserUID(localStorageUID)
  })

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
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
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
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
