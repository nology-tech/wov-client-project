import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";
import { customRender } from "../../utils/testUtils";


describe("Profile component", () => {
  it("renders navigation items correctly", () => {
    customRender(<Profile />);
    const nameText = screen.getByText(/Name/i);
    const bioText = screen.getByText(/Bio/i);
    const emailText = screen.getByText(/Email/i);
    const passwordText = screen.getByText(/Password/i);

    expect(nameText).toBeInTheDocument();
    expect(bioText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(passwordText).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /edit profile/i });
    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    expect(editButton).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  it("redirects to edit profile page when 'EDIT PROFILE' button is clicked", async () => {
    const { getByText } = customRender(<Profile />);
    const editProfileButton = getByText("EDIT PROFILE");
    await userEvent.click(editProfileButton);
    expect(window.location.pathname).toEqual("/edit");
  });
  it("represents the user's password as asterisks", () => {
    const { getByText } = customRender(<Profile />);
    const passwordElement = getByText(/password/i);

    if (passwordElement && passwordElement.textContent) {
      const passwordText = passwordElement.textContent.trim().substring(10);
      const isStarredPassword = passwordText
        .split("")
        .every((char: string) => char === "*");
      expect(isStarredPassword).toBeTruthy();
    } else {
      expect(true).toBeFalsy();
    }
  });
});
