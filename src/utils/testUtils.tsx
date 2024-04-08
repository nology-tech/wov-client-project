import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

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
