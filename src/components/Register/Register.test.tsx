import { screen, fireEvent, waitFor } from "@testing-library/react";
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
  it("should show an error message when passwords don't match", async () => {
    customRender(<Register />);
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.click(screen.getByText(/NEXT/i));
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password1" },
    });
    fireEvent.click(screen.getByText("SIGN UP"));
    await waitFor(() => {
      expect(
        screen.getByText("Passwords do not match. Try again.")
      ).toBeInTheDocument();
    });
  });
});
