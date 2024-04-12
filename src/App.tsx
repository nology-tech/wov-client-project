import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import { randomUserProfiles } from "./utils/mockData";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/tasks" element={<ActiveTasks />} />
        <Route path="/leaderboard" element={<Leaderboard users={randomUserProfiles}/>}/>
    </Routes>
    </>
  );
};

export default App;
