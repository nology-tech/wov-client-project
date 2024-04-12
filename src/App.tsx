import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import { Leaderboard } from "@mui/icons-material";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/leaderboard" element={<Leaderboard/>}/>
    </Routes>
  );
};

export default App;
