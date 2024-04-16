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
// -- CHARLIE
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { activeTasks } from "./mockData/mockActiveTasks";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";

const App = () => {
  const firestore = getFirestore(app);

  // tribeUsers.forEach(async (member, index) => {
  //   if (index > 0) {
  //     await setDoc(doc(firestore, "test-tribe", "test-user-" + index), member);
  //   }
  // });

  // setDoc(
  //   doc(firestore, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
  //   tribeUsers[0]
  // );

  // setDoc(doc(firestore, "test-active-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"), {
  //   activeTasks: activeTasks,
  // });

  // setDoc(
  //   doc(firestore, "test-completed-tasks", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"),
  //   { completedTasks: completedTasks }
  // );

  // console.log({
  //   activeTasks: activeTasks,
  // });

  // console.log({ completedTasks: completedTasks });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<ActiveTasks />} />
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
