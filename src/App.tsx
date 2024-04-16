import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import { completedTasks } from "./mockData/mockCompletedTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
// -- CHARLIE
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { activeTasks } from "./mockData/mockActiveTasks";

const App = async () => {
  const firestore = getFirestore(app);

  // tribeUsers.forEach(async (member, index) => {
  //   if (index > 0) {
  //     await setDoc(doc(firestore, "test-tribe", "test-user-" + index), member);
  //   }
  // });

  // setDoc(doc(firestore, "test-active-tasks", "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"), {
  //   activeTasks: activeTasks,
  // });

  // setDoc(
  //   doc(firestore, "test-completed-tasks", "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"),
  //   { completedTasks: completedTasks }
  // );

  // console.log({
  //   activeTasks: activeTasks,
  // });

  // console.log({ completedTasks: completedTasks });
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/calendar"
        element={<Calendar completedTasks={completedTasks} />}
      />
      <Route path="/leaderboard" element={<Leaderboard users={tribeUsers} />} />
      <Route path="/profile" element={<Profile user={tribeUsers[0]} />} />
    </Routes>
  );
};

export default App;
