import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { customRender } from "../../utils/testUtils";

describe("Home Component", () => {
  it("should render the button"),
    () => {
      customRender(<Home />);
      const homeButton = screen.getByText("VIEW TODAY's TASKS");
      expect(homeButton).toBeInTheDocument();
    };

  it("should render the paragraph"),
    () => {
      customRender(<Home />);
      const paragraph = screen
        .getByTestId("container")
        .querySelector("paragraph");
      expect([paragraph]).toBeInTheDocument;
    };

  it("should redirect to tasklist when 'TASK LIST' button is clicked", async () => {
    const { getByText } = customRender(<Home />);
    const goToTasks = getByText("VIEW TODAY's TASKS");
    await userEvent.click(goToTasks);
    expect(window.location.pathname).toEqual("/tasks");
  });
});
