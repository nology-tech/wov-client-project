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
import { useState, useEffect } from "react";
import Loading from "./components/Loading/Loading";
import Dashboard from "./pages/Dashboard/Dashboard";
import Create from "./pages/Create/Create";
import ProfileAdmin from "./pages/ProfileAdmin/ProfileAdmin";
import LeaderboardAdmin from "./pages/LeaderboardAdmin/LeaderboardAdmin";
import Reporting from "./pages/Reporting/Reporting";

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, []);

  return (
    <>
      <FirestoreProvider>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            {isAuthenticated ? (
              <Route path="/" element={<PrivateRoute />}>
                {isAdmin ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/profile" element={<ProfileAdmin />} />
                    <Route
                      path="/leaderboard-admin"
                      element={<LeaderboardAdmin />}
                    />
                    <Route path="/reporting" element={<Reporting />} />
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
        )}
      </FirestoreProvider>
    </>
  );
};

export default App;
