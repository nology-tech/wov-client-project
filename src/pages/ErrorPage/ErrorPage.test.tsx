import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorPage from "./ErrorPage";
import { customRender } from "../../utils/testUtils";

describe("ErrorPage", () => {
  it("should render content properly "),
    () => {
      customRender(<ErrorPage />);

      const homeButton = screen.getByText("Home");
      const errorMessage = screen.getByText(
        "OOPS. LOOKS LIKE YOU'VE TAKEN A WRONG TURN."
      );
      expect(errorMessage).toBeInTheDocument();
      expect(homeButton).toBeInTheDocument();
    };

  it("should redirect to /auth when 'home' button is clicked when the user is not signed it", async () => {
    const { getByText } = customRender(<ErrorPage />);
    const home = getByText("Home");
    await userEvent.click(home);
    expect(window.location.pathname).toEqual("/auth");
  });

  it("should redirect to / when 'home' button is clicked when the user is signed it", async () => {
    const { getByText } = customRender(<ErrorPage />, { isAuthenticated: true});
    const home = getByText("Home");
    await userEvent.click(home);
    expect(window.location.pathname).toEqual("/");
  });
});
