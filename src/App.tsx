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
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
<<<<<<< HEAD
import { useState} from 'react';
import Loading from "./components/Loading/Loading";

=======
import LeaderboardAdmin from "./pages/LeaderboardAdmin/LeaderboardAdmin"
>>>>>>> 9d3941c298ba44132a07f2909a528f72736fbecd

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  return (
    <>
      <FirestoreProvider>
      <Loading loading={loading} isAuthenticated={isAuthenticated} setLoading={setLoading}/>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<PrivateRoute />}>
              {isAdmin ? (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/leaderboard-admin" element={<LeaderboardAdmin/>}/>
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/tasks" element={<ActiveTasks />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit" element={<UpdateProfile />} />
                </>
              )}
            </Route>
          ) : (
            <>
              <Route path="/" element={<Account />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<Login />} />
            </>
          )}
          {!loading && <Route path="*" element={<ErrorPage />} />}
        </Routes>
      </FirestoreProvider>
    </>
  );
};

export default App;
