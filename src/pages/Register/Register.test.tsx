import { screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { customRender } from "../../utils/testUtils";
import { FirestoreContextProps } from "../../context/FirestoreProvider/FirestoreProvider";
import { GroupData } from "../../types/Groups";


describe("Register Component", () => {
  const mockTribes: GroupData[] = [
    {
      name: "testing",
      startDate: "",
      image: "",
      numberOfMembers: 10,
      totalPoints: 100,
      users: ["2", "4"],
    },
    {
      name: "testing two",
      startDate: "",
      image: "",
      numberOfMembers: 6,
      totalPoints: 1500,
      users: ["7", "84"],
    },
  ];

  const mockFireStore = {
    getTribes: (_: string) => Promise.resolve(mockTribes),
  } as FirestoreContextProps;

  it("should render the heading", () => {
    customRender(<Register />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });
    const heading = screen.getByRole("heading", {
      name: /create an account/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("should render a form with the right labels", () => {
    customRender(<Register />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });
    const firstNameLabel = screen.getByText(/first name/i);
    const lastNameLabel = screen.getByText(/last name/i);

    expect(firstNameLabel).toBeInTheDocument();
    expect(lastNameLabel).toBeInTheDocument();
  });

  it("should render button with default props and correct text", () => {
    customRender(<Register />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toHaveClass("button--light-grey");
  });
  it("should render the image from the assets folder with the correct file name", () => {
    customRender(<Register />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });
    const image = screen.getByAltText("Arrow Left Icon");

    expect(image).toBeInTheDocument();
  });
  // it("should show an error message when passwords don't match", async () => {
  //   customRender(<Register />, {
  //     useRouting: true,
  //     firestoreValue: mockFireStore,
  //   });

  //   const firstName = screen.getByRole("textbox", {
  //     name: /first name\*/i,
  //   });

  //   const lastName = screen.getByRole("textbox", {
  //     name: /last name\*/i,
  //   });

  //   const bio = screen.getByRole("textbox", {
  //     name: /bio\*/i,
  //   });

  //   const tribe = screen.getByRole("combobox", {
  //     name: /tribe\*/i,
  //   });

  //   fireEvent.change(firstName, {
  //     target: { value: "John" },
  //   });
  //   fireEvent.change(lastName, {
  //     target: { value: "Doe" },
  //   });
  //   fireEvent.change(bio, {
  //     target: { value: "Whatever" },
  //   });
  //   fireEvent.change(tribe, {
  //     target: { value: "test-tribe" },
  //   });

  //   fireEvent.click(screen.getByText(/next/i));

  //   const email = await screen.getByRole("textbox", {
  //     name: /email address/i,
  //   });

  //   fireEvent.change(email, {
  //     target: { value: "test@email.com" },
  //   });

  //   const password = screen.getByLabelText("Password");
  //   fireEvent.change(password, {
  //     target: { value: "password" },
  //   });

  //   const confirmPassword = screen.getByLabelText("Password");
  //   fireEvent.change(confirmPassword, {
  //     target: { value: "password1" },
  //   });

  //   fireEvent.click(screen.getByText("SIGN UP"));

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("Passwords do not match. Try again.")
  //     ).toBeInTheDocument();
  //   });
  // });
});
