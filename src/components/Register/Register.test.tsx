import { screen } from "@testing-library/react";
import Register from "./Register";
import { customRender } from "../../utils/testUtils";

describe("Register Component", () => {
  it("should render the heading", () => {
    customRender(<Register />);
    const heading = screen.getByRole("heading", {
      name: /create account/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("should render a form with the right labels", () => {
    customRender(<Register />);
    const firstNameLabel = screen.getByText(/first name/i);
    const lastNameLabel = screen.getByText(/last name/i);

    expect(firstNameLabel).toBeInTheDocument();
    expect(lastNameLabel).toBeInTheDocument();
  });

  it("should render button with default props and correct text", () => {
    customRender(<Register />);

    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toHaveClass("button--primary");
  });
  it("should render the image from the assets folder with the correct file name", () => {
    customRender(<Register />);
    const image = screen.getByAltText("Arrow Left Icon");

    expect(image).toBeInTheDocument();
  });
});
