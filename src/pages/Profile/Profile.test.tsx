import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";
import { randomUserProfiles } from "./mockData";
import { customRender } from "../../utils/testUtils";

describe("Profile component", () => {
  it("renders navigation items correctly", () => {
    customRender(<Profile user={randomUserProfiles[0]} />);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    const editButton = screen.getByRole("button", { name: /edit profile/i });
    const signOutButton = screen.getByRole("button", { name: /sign out/i });

    expect(editButton).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  it("redirects to edit profile page when 'EDIT PROFILE' button is clicked", async () => {
    const { getByText } = customRender(
      <Profile user={randomUserProfiles[0]} />
    );
    const editProfileButton = getByText("EDIT PROFILE");
    await userEvent.click(editProfileButton);
    expect(window.location.pathname).toEqual("/edit");
  });

  it("represents the users password as *******"),
    () => {
      expect(screen.getByText("starredPassword")).toBeInTheDocument();
      expect(screen.getByText("starredPassword")).toEqual(
        randomUserProfiles[0].password.length
      );
    };
});
