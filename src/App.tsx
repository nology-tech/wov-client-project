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
import { useAuth } from "./Provider/Provider";
import { PrivateRoute } from "./Provider/PrivateRoute";
import { FirestoreProvider } from "./context/FirestoreProvider/FirestoreProvider";

const App = () => {
  const {isAuthenticated} = useAuth()
  const [userUID, setUserUID] = useState<null | string>(null);
  // NOTE: this console.log is used to workaround an eslint warning
  // It should be deleted once userUID is used
  console.log(userUID);

  const handleSetUserUID = (userUID: string) => {
    setUserUID(userUID);
  };

  return (
    <>
      <FirestoreProvider>
        <Routes>
        {!isAuthenticated ?
          <>
            <Route path="/auth" element={<Account />} />
            <Route path="/register" element={<Register setUserUID={handleSetUserUID} />} />
            <Route path="/sign-in" element={<Login />} />
          </>
          :
          <Route path="*" element={<ErrorPage />} />
        }

        {isAuthenticated ?
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<ActiveTasks />} />
            <Route
              path="/calendar"
              element={
                <Calendar />
              }
            />
            <Route
              path="/leaderboard"
              element={<Leaderboard />}
            />
            <Route path="/profile" element={<Profile user={tribeUsers[0]} />} />
          </Route>
          :
          <Route path="*" element={<ErrorPage />} />
        }
        </Routes>
      </FirestoreProvider>
    </>
  );
};

export default App;
