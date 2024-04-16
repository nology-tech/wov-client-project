import { screen } from "@testing-library/react";
import { customRender } from "../../utils/testUtils";
import Login from "./Login";
import { useState } from "react";

describe("Should pass all login tests", () => {
  it("should render welcome title on the page", () => {
    const [_testState, setTestState] = useState<string | null>("");
    customRender(<Login setUserUID={setTestState} />);

    const welcomeTitle = screen.getByText(/Welcome Back/i);
    expect(welcomeTitle).toBeInTheDocument();
  });
  it("should render form for email and password", () => {
    customRender(<Login setUserUID={useState} />);
    const signInForm = screen.getByRole("form");
    expect(signInForm).toBeInTheDocument();
  });
});
