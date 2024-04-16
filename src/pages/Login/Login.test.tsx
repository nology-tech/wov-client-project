import { screen } from "@testing-library/react";
import { customRender } from "../../utils/testUtils";
import App from "../../App";
import { useState } from "react";

describe("Should pass all login tests", () => {
  it("should render welcome title on the page", () => {
    customRender(<App />);

    const welcomeTitle = screen.getByText(/Welcome Back/i);
    expect(welcomeTitle).toBeInTheDocument();
  });
  it("should render form for email and password", () => {
    customRender(<App />);
    const emailInputText = screen.getByPlaceholderText(/you@example\.com/i);
    expect(emailInputText).toBeInTheDocument();
  });
});
