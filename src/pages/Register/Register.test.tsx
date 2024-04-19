import { screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { customRender } from "../../utils/testUtils";

describe("Register Component", () => {
  const mockSetState = () => null;

  it("should render the heading", () => {
    customRender(<Register setUserUID={mockSetState} />);
    const heading = screen.getByRole("heading", {
      name: /create an account/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("should render a form with the right labels", () => {
    customRender(<Register setUserUID={mockSetState} />);
    const firstNameLabel = screen.getByText(/first name/i);
    const lastNameLabel = screen.getByText(/last name/i);

    expect(firstNameLabel).toBeInTheDocument();
    expect(lastNameLabel).toBeInTheDocument();
  });

  it("should render button with default props and correct text", () => {
    customRender(<Register setUserUID={mockSetState} />);

    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toHaveClass("button--light-grey");
  });
  it("should render the image from the assets folder with the correct file name", () => {
    customRender(<Register setUserUID={mockSetState} />);
    const image = screen.getByAltText("Arrow Left Icon");

    expect(image).toBeInTheDocument();
  });
  it("should show an error message when passwords don't match", async () => {
    customRender(<Register setUserUID={mockSetState} />);

    fireEvent.change(screen.getByLabelText("First Name*"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name*"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Bio*"), {
      target: { value: "Whatever" },
    });
    fireEvent.select(screen.getByLabelText("Tribe*"), {
      target: { value: "test-tribe" },
    });
    fireEvent.click(screen.getByText(/next/i));

    await waitFor(() => {
      expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@email.com" },
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
