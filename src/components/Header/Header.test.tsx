import { screen } from "@testing-library/react";
import Header from "./Header";
import { customRender } from "../../utils/testUtils";

describe("should pass Header component tests", () => {
  it("should render subtitle", () => {
    customRender(<Header subtitle={"Test Subtitle"} />);
    const headerTitle = screen.getByText("Test Subtitle");
    expect(headerTitle).toBeInTheDocument();
  });

  it("should render user profile image if one exists", () => {
    customRender(
      <Header
        subtitle={""}
        profileImage={"../../assets/images/arrow-left.png"}
      />
    );

    const profileImg = screen.getByLabelText("profile picture link");
    

    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute("src", "../../assets/images/arrow-left.png")
  });

  it("should render default image if user profile image is not given", () => {
    customRender(
      <Header
        subtitle={""}

      />
    );

    const profileImg = screen.getByLabelText("profile picture link");
    console.log(profileImg)

    expect(profileImg).toBeInTheDocument();
    expect(profileImg).toHaveAttribute("src", "../../assets/images/default-profile-image.png")
  });
});
