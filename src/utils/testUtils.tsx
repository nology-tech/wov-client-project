import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  FirestoreContext,
  FirestoreContextProps,
} from "../context/FirestoreProvider/FirestoreProvider";
import {
  AuthContext,
  AuthContextProps,
} from "../components/AuthProvider/AuthProvider";

type Options = {
  useRouting?: boolean;
  firestoreValue?: FirestoreContextProps;
  useAuthProvider?: boolean;
  isAuthenticated?: boolean;
  userUID?: string | null;
};

const defaultOptions: Options = {
  useRouting: true,
  firestoreValue: undefined,
  useAuthProvider: true,
  isAuthenticated: false,
  userUID: null,
};

export const customRender = (
  ui: JSX.Element,
  { useRouting = true,
    firestoreValue = undefined,
    useAuthProvider = true,
    isAuthenticated = false,
    userUID = null
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
    uiResult = wrapWithAuthProvider(uiResult, {isAuthenticated, userUID});
  }

  // use RTL's render function to return the test component
  return render(uiResult);
};

const wrapWithRouting = (ui: JSX.Element): JSX.Element => {
  return <Router>{ui}</Router>;
};

type AuthProviderOptions = {
  isAuthenticated?: boolean,
  userUID?: string | null
}

const wrapWithAuthProvider = (
  ui: JSX.Element,
  { isAuthenticated, userUID }: AuthProviderOptions
): JSX.Element => {
  const defaultAuthContext: AuthContextProps = {
    loginUser: (_, __) => Promise.resolve({ error: null }),
    logoutUser: () => null,
    isAuthenticated: isAuthenticated ?? false,
    userUID: userUID ?? null,
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
  };

  return (
    <FirestoreContext.Provider
      value={{ ...defaultFireStoreContext, ...firestoreContext }}
    >
      {ui}
    </FirestoreContext.Provider>
  );
};
