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
import { useEffect, useState } from "react";
import { UserProfile } from "./types/User";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  const [userUID, setUserUID] = useState<null | string>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: "",
    totalScore: 0,
    name: "",
    email: "",
  });
  // NOTE: this console.log is used to workaround an eslint warning
  // It should be deleted once userUID is used
  console.log(userUID);

  const handleSetUserUID = (userUID: string) => {
    setUserUID(userUID);
  };

  const fetchCurrentUser = async () => {
    try {
      const userRef = doc(db, "test-tribe", "DrJZcEmb22Z5pG6fn2Fj2YYTHEy1");
      const userDocSnap = await getDoc(userRef);
      const user = userDocSnap.data() as DocumentData;
      const currentUser: UserProfile = {
        id: user.id,
        img: user.img,
        totalScore: user.totalScore,
        name: user.name,
        bio: user.bio,
        email: user.email,
      };
      setCurrentUser(currentUser);
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
            element={<Profile user={currentUser as UserProfile} />}
          />{" "}
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
