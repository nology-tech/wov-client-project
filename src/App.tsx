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
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { PrivateRoute } from "./components/AuthProvider/AuthProvider";
import { FirestoreProvider } from "./context/FirestoreProvider/FirestoreProvider";

const App = () => {
  const { isAuthenticated } = useAuth();
  const [userUID, setUserUID] = useState<null | string>(null);

  const handleSetUserUID = (userUID: string | null) => {
    setUserUID(userUID || "");
  };

  return (
    <>
      <FirestoreProvider>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<ActiveTasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/leaderboard" element={<Leaderboard users={tribeUsers} currentUserID={userUID} />} />
              <Route
                path="/profile"
                element={
                  <Profile user={tribeUsers[0]} setUserUID={setUserUID} />
                }
              />
            </Route>
          ) : (
            <>
              <Route path="/auth" element={<Account />} />
              <Route
                path="/register"
                element={<Register setUserUID={handleSetUserUID} />}
              />
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
