import { screen } from "@testing-library/react";
import { customRender } from "../../utils/testUtils";
import Login from "./Login";

describe("Should pass all login tests", () => {
  // This is a NOP function
  const fakeSetState = () => null 

  it("should render welcome title on the page", () => {
    customRender(<Login setUserUID={fakeSetState} />);

    const welcomeTitle = screen.getByText(/Welcome Back/i);
    expect(welcomeTitle).toBeInTheDocument();
  });

  it("should render form for email and password", () => {
    customRender(<Login setUserUID={fakeSetState} />);
    const emailInputText = screen.getByPlaceholderText(/you@example\.com/i);
    expect(emailInputText).toBeInTheDocument();
  });
});
