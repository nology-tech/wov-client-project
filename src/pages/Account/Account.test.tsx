import { screen } from "@testing-library/react";
import Account from "./Account";
import { customRender } from "../../utils/testUtils";

describe("Account Component", () => {
  it("should render the heading", () => {
    customRender(<Account />);
    const heading = screen.getByText(`Way Of The Viking`);
    expect(heading).toBeInTheDocument();
  });
  it("should render the sub-heading", () => {
    customRender(<Account />);
    const text = screen.getByText(/change your mindset/i);
    expect(text).toBeInTheDocument();
  });

  it("should render button with the secondary variant prop and correct text", () => {
    customRender(<Account />);

    expect(screen.getByText("SIGN IN")).toHaveClass("button--secondary");
  });
  it("should render button with default props and correct text", () => {
    customRender(<Account />);

    expect(screen.getByText("CREATE AN ACCOUNT")).toBeInTheDocument();
    expect(screen.getByText("CREATE AN ACCOUNT")).toHaveClass(
      "button--primary"
    );
  });
});
