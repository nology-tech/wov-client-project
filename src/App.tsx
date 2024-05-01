import "./styles/main.scss";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { FirestoreProvider } from "./context/FirestoreProvider/FirestoreProvider";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useState } from "react";

const App = () => {
  const { isAuthenticated } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <>
      <FirestoreProvider>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home isAdmin={isAdmin}/>} />
              <Route path="/tasks" element={<ActiveTasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<UpdateProfile />} />
            </Route>
          ) : (
            <>
              <Route path="/auth" element={<Account />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<Login />} />
            </>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </FirestoreProvider>
    </>
  );
};

export default App;
