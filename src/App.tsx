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

const App = () => {
  const [userUID, setUserUID] = useState<null | string>(null);
  // NOTE: this console.log is used to workaround an eslint warning
  // It should be deleted once userUID is used
  console.log(userUID);
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
    setUserUID(userUID);
  };

  const fetchCurrentUser = async () => {
    try {
      const userRef = getDocumentFromFirestoreCollection(
        "test-tribe",
        "DrJZcEmb22Z5pG6fn2Fj2YYTHEy1"
      );
      userRef.then((userData) => {
        setCurrentUser(userData as UserProfile);
      });
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
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<ActiveTasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/profile"
            element={
              <Profile user={currentUser} setUserUID={handleSetUserUID} />
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
          <Route
            path="/edit"
            element={
              <UpdateProfile
                currentUser={currentUser}
                setCurrentUser={handleSetCurrentUser}
              />
            }
          />
        </Routes>
      </FirestoreProvider>
    </>
  );
};

export default App;
