import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Account from "./components/Account/Account";
import Register from "./components/Register/Register";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Account />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
