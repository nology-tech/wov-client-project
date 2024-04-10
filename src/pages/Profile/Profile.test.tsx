import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";
import { randomUserProfiles } from "./mockData";
import { customRender } from "../../utils/testUtils";

describe("Profile component", () => {
  it("renders navigation items correctly", async () => {
    customRender(<Profile user={randomUserProfiles[0]} />);
  });

  it("redirects to edit profile page when 'EDIT PROFILE' button is clicked", async () => {
    const { getByText } = customRender(
      <Profile user={randomUserProfiles[0]} />
    );

    const editProfileButton = getByText("EDIT PROFILE");
    await userEvent.click(editProfileButton);

    expect(window.location.pathname).toEqual("/edit");
  });
});
