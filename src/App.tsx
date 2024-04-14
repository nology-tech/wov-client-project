import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { randomUserProfiles } from "./utils/mockData";
import { completedTasks } from "./mockData/mockCompletedTasks";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/calendar"
        element={<Calendar completedTasks={completedTasks} />}
      />
      <Route
        path="/leaderboard"
        element={<Leaderboard users={randomUserProfiles} />}
      />
      <Route
        path="/profile"
        element={<Profile user={randomUserProfiles[0]} />}
      />
    </Routes>
  );
};

export default App;
