import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import {
  NewUser,
  UserLoading,
  UserProfile,
  AdminProfile,
  AdminLoading,
} from "../../types/User";
import {
  createDocumentInFirestoreCollection,
  FirestoreCollections,
  getDocumentFromFirestoreCollection,
  saveFileAndRetrieveDownloadUrl,
  updateDocumentInFirestoreCollection,
} from "../../utils/dbUtils";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import { Task, CompletedTask } from "../../types/Task";
import { doc, increment, updateDoc } from "firebase/firestore";
type PromiseObjectNullString = Promise<{ error: null | string }>;
const userLoading: UserLoading = {
  id: "",
  totalScore: 0,
  name: "",
  email: "",
  tribe: "",
  loading: true,
};
const adminLoading: AdminLoading = {
  id: "",
  email: "",
  reference: "",
};
export type AuthContextProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginUser: (email: string, password: string) => PromiseObjectNullString;
  logoutUser: () => void;
  getUser: () => UserProfile | UserLoading;
  getAdmin: () => AdminProfile;
  createUser: (newUser: NewUser, profilePic?: File) => PromiseObjectNullString;
  updateUser: (
    data:
      | Pick<UserProfile, "bio" | "name" | "email" | "img">
      | Pick<UserProfile, "totalScore">
  ) => PromiseObjectNullString;
};
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const localStorageUID = localStorage.getItem("userUID");
    if (localStorageUID) {
      setIsAuthenticated(true);
      getUserFromFirestore(localStorageUID);
      getAdminFromFirestore(localStorageUID);
      checkAdminStatus(localStorageUID);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const checkAdminStatus = async (userID: string) => {
    const adminDoc = await getDocumentFromFirestoreCollection(
      FirestoreCollections.ADMIN,
      userID
    );
    setIsAdmin(adminDoc !== null);
  };

  const incrementLogin = async (userID: string) => {
    const userDoc = doc(db, "users", userID);
    await updateDoc(userDoc, {
      loginCount: increment(1),
    });
  };

  const loginUser = async (
    email: string,
    password: string
  ): PromiseObjectNullString => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userID = userCredential.user.uid;
      const userDoc = await getDocumentFromFirestoreCollection<UserProfile>(
        FirestoreCollections.USERS,
        userID
      );
      if (userDoc) {
        await incrementLogin(userID);
      }
      updateAuthState(userCredential);
      navigate("/");
    } catch (error) {
      const errorCode = (error as AuthError).code;
      if (errorCode === "auth/invalid-credential") {
        return { error: "Invalid email/password" };
      } else {
        return {
          error: "Oops, something went wrong. Try again in a few minutes",
        };
      }
    }
    return { error: null };
  };
  const updateAuthState = async (userCredential: UserCredential) => {
    const userID = userCredential.user.uid;
    localStorage.setItem("userUID", userID);
    if (!user || "loading" in user) {
      getUserFromFirestore(userID);
    }
    checkAdminStatus(userID);
    getAdminFromFirestore(userID);
    setIsAuthenticated(true);
  };
  const getUserFromFirestore = async (userID: string) => {
    const storedUser = await getDocumentFromFirestoreCollection<UserProfile>(
      FirestoreCollections.USERS,
      userID
    );
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const getAdminFromFirestore = async (userID: string) => {
    const adminData = await getDocumentFromFirestoreCollection<AdminProfile>(
      FirestoreCollections.ADMIN,
      userID
    );
    if (adminData) {
      setAdmin(adminData);
    }
  };

  const logoutUser = () => {
    signOut(auth);
    localStorage.removeItem("userUID");
    setIsAdmin(false);
    setIsAuthenticated(false);
    setUser(userLoading);
    navigate("/");
  };
  const updateUser = async (
    data:
      | Pick<UserProfile, "bio" | "name" | "email" | "img">
      | Pick<UserProfile, "totalScore">
    // profileFile?: File
  ): PromiseObjectNullString => {
    if (user === null) {
      return { error: "No user stored" };
    }
    const { error, updated } = await updateDocumentInFirestoreCollection(
      FirestoreCollections.USERS,
      user.id,
      data
    );
    if (updated) {
      // Update local user state with the new data
      setUser({ ...user, ...data });
    }
    return { error };
  };
  const createUser = async (
    { email, password, firstName, lastName, bio, tribe }: NewUser,
    profileFile?: File
  ): PromiseObjectNullString => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      updateAuthState(userCredential);
      const uid = userCredential.user.uid;
      const userProfile = {
        id: uid,
        totalScore: 0,
        name: `${capitalisedFirstLetters(firstName)} ${capitalisedFirstLetters(
          lastName
        )}`,
        bio,
        email,
        tribe,
        img: "",
        activeTasks: [] as Task[],
        completedTasks: [] as CompletedTask[],
      };
      if (profileFile) {
        const filePath = `${uid}(${firstName}-${lastName})/images/profile`;
        const { fileDownloadUrl, error } = await saveFileAndRetrieveDownloadUrl(
          filePath,
          profileFile,
          false
        );
        if (error) {
          throw new Error(error);
        }
        userProfile.img = fileDownloadUrl || "";
      }
      await createDocumentInFirestoreCollection(
        FirestoreCollections.USERS,
        uid,
        userProfile
      );
      await createDocumentInFirestoreCollection(
        FirestoreCollections.COMPLETED_TASKS,
        uid,
        {
          completedTasks: [],
        }
      );
      await createDocumentInFirestoreCollection(
        FirestoreCollections.ACTIVE_TASKS,
        uid,
        {
          activeTasks: [],
        }
      );
      setUser(userProfile);
      navigate("/");
      return { error: null };
    } catch (error) {
      return { error: (error as Error).message };
    }
  };
  const getUser = () => {
    if (user) {
      return user;
    } else {
      return userLoading;
    }
  };

  const getAdmin = () => {
    if (admin) {
      return admin;
    } else {
      return adminLoading;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        getUser,
        getAdmin,
        isAuthenticated,
        isAdmin,
        loginUser,
        logoutUser,
        createUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
