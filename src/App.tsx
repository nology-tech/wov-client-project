import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import { completedTasks } from "./mockData/mockCompletedTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/calendar"
        element={<Calendar completedTasks={completedTasks} />}
      />
      <Route path="/leaderboard" element={<Leaderboard users={tribeUsers} />} />
      <Route path="/profile" element={<Profile user={tribeUsers[0]} />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
