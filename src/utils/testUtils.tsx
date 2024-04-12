import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from "firebase/app";

export const customRender = (ui: JSX.Element, useRouting = true) => {
  // wrap components in routing if requested
  let uiResult = ui;

  if (useRouting) {
    uiResult = wrapWithRouting(ui);
  }

  // use RTL's render function to return the test component
  return render(uiResult);
};

const wrapWithRouting = (ui: JSX.Element): JSX.Element => {
  return <Router>{ui}</Router>;
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_TOKEN,
  authDomain: "wov-client-project.firebaseapp.com",
  projectId: "wov-client-project",
  storageBucket: "wov-client-project.appspot.com",
  messagingSenderId: "500736757552",
  appId: "1:500736757552:web:2a7142e64715df07aec2f5",
  measurementId: "G-CJVJ3K385S",
};
