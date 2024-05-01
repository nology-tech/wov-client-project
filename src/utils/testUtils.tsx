import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  FirestoreContext,
  FirestoreContextProps,
} from "../context/FirestoreProvider/FirestoreProvider";
import {
  AuthContext,
  AuthContextProps,
} from "../context/AuthProvider/AuthProvider";
import { UserLoading, UserProfile } from "../types/User";
import { ActiveTask } from "../types/Task";

type Options = {
  useRouting?: boolean;
  firestoreValue?: FirestoreContextProps;
  useAuthProvider?: boolean;
  isAuthenticated?: boolean;
  user?: UserProfile | UserLoading;
};

const testUser: UserProfile = {
  id: "OuZ1eeH9c5ZosgoXUi6Iraq7oM03",
  totalScore: 0,
  name: "Test Account",
  email: "test@example.com",
  tribe: "test-tribe",
};

const defaultOptions: Options = {
  useRouting: true,
  firestoreValue: undefined,
  useAuthProvider: true,
  isAuthenticated: false,
  user: testUser,
};

export const customRender = (
  ui: JSX.Element,
  {
    useRouting = true,
    firestoreValue = undefined,
    useAuthProvider = true,
    isAuthenticated = false,
    user,
  }: Options = defaultOptions
) => {
  // wrap components in routing if requested
  let uiResult = ui;

  if (firestoreValue) {
    uiResult = wrapWithFirestoreProvider(ui, firestoreValue);
  }

  if (useRouting) {
    uiResult = wrapWithRouting(uiResult);
  }

  if (useAuthProvider) {
    uiResult = wrapWithAuthProvider(uiResult, {
      isAuthenticated,
      user: user || testUser,
    });
  }

  // use RTL's render function to return the test component
  return render(uiResult);
};

const wrapWithRouting = (ui: JSX.Element): JSX.Element => {
  return <Router>{ui}</Router>;
};

type AuthProviderOptions = {
  isAuthenticated?: boolean;
  user: UserProfile | UserLoading;
  isAdmin?: boolean;
};

const wrapWithAuthProvider = (
  ui: JSX.Element,
  { isAuthenticated, user, isAdmin }: AuthProviderOptions
): JSX.Element => {
  const defaultAuthContext: AuthContextProps = {
    createUser: (_, __) => Promise.resolve({ error: null }),
    updateUser: (_) => Promise.resolve({ error: null }),
    loginUser: (_, __) => Promise.resolve({ error: null }),
    logoutUser: () => null,
    isAuthenticated: isAuthenticated ?? false,
    isAdmin: isAdmin ?? false,
    getUser: () => user,
  };

  return (
    <AuthContext.Provider value={{ ...AuthContext, ...defaultAuthContext }}>
      {ui}
    </AuthContext.Provider>
  );
};

const wrapWithFirestoreProvider = (
  ui: JSX.Element,
  firestoreContext: FirestoreContextProps
): JSX.Element => {
  const defaultFireStoreContext = {
    getActiveTasks: (_: string) => Promise.resolve([]),
    getCompletedTasks: (_: string) => Promise.resolve([]),
    getLeaderboard: (_: string) => Promise.resolve([]),
    completeActiveTask: (_: UserProfile, __: ActiveTask) => Promise.resolve(),
  };

  return (
    <FirestoreContext.Provider
      value={{ ...defaultFireStoreContext, ...firestoreContext }}
    >
      {ui}
    </FirestoreContext.Provider>
  );
};
