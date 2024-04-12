import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />S
    </Routes>
  );
};

export default App;
