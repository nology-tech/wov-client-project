import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import { tribeUsers } from "./mockData/mockTribe";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { FirestoreProvider } from "./context/FirestoreProvider/FirestoreProvider";
import { useState } from "react";

const App = () => {
  const [userUID, setUserUID] = useState<string>("1a38"); // Using Baheer as MOCK current user
  // NOTE: this console.log is used to workaround an eslint warning
  // It should be deleted once userUID is used
  console.log(userUID);

  const handleSetUserUID = (userUID: string | null) => {
    setUserUID(userUID || "");
  };

  return (
    <>
      <FirestoreProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<ActiveTasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard users={tribeUsers} currentUserID={userUID} />}
          />
          <Route
            path="/profile"
            element={
              <Profile user={tribeUsers[0]} setUserUID={handleSetUserUID} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login setUserUID={handleSetUserUID} />}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/auth" element={<Account />} />
          <Route
            path="/register"
            element={<Register setUserUID={handleSetUserUID} />}
          />
        </Routes>
      </FirestoreProvider>
    </>
  );
};

export default App;
