import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import "./styles/main.scss";
import Calendar from "./pages/Calendar/Calendar";
import ActiveTasks from "./pages/ActiveTasks/ActiveTasks";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import { FirestoreProvider } from "./context/FirestoreProvider/FirestoreProvider";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import { useEffect, useState } from "react";
import { UserProfile } from "./types/User";
import { getDocumentFromFirestoreCollection } from "./utils/dbUtils";
import { tribeUsers } from "./mockData/mockTribe";
import { useAuth } from "./hooks/useAuth";
import { PrivateRoute } from "./components/AuthProvider/AuthProvider";

const App = () => {
  const { isAuthenticated } = useAuth();
  const [userUID, setUserUID] = useState<null | string>(
    "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"
  );
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "",
    totalScore: 0,
    name: "",
    email: "",
  });

  const handleSetCurrentUser = (updatedUser: UserProfile) => {
    setCurrentUser({ ...currentUser, ...updatedUser });
  };

  const handleSetUserUID = (userUID: string | null) => {
    setUserUID(userUID || "");
  };

  const fetchCurrentUser = async () => {
    try {
      const userRef = await getDocumentFromFirestoreCollection(
        "test-tribe",
        userUID as string
      );
      if (userRef) {
        setCurrentUser(userRef as UserProfile);
      }
    } catch {
      console.log("Error: Could not locate current user in the database");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      <FirestoreProvider>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<ActiveTasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route
                path="/leaderboard"
                element={
                  <Leaderboard users={tribeUsers} currentUserID={userUID} />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile user={currentUser} setUserUID={handleSetUserUID} />
                }
              />
              <Route
                path="/edit"
                element={
                  <UpdateProfile
                    currentUser={currentUser}
                    setCurrentUser={handleSetCurrentUser}
                  />
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
