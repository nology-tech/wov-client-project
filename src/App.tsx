import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Navigation from "./components/Navigation/Navigation";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/tasks" element={<ActiveTasks />} />
      </Routes>
    </>
  );
};

export default App;
