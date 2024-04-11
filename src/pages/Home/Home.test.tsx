import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { customRender } from "../../utils/testUtils";

describe("Navigation component", () => {
  it("should render the home page", () => {
    customRender(<Home />);
  });

  it("should render the button"),
    () => {
      customRender(<Home />);
      const homeButton = screen.getByText("VIEW TODAY's TASKS");
      expect(homeButton).toBeInTheDocument();
    };

  it("shoulld render the paragraph"),
    () => {
      customRender(<Home />);
      const paragraph = screen
        .getByTestId("container")
        .querySelector("paragraph");
      expect([paragraph]).toBeInTheDocument;
    };

  it("shoulld redirect to tasklist when 'TASK LIST' button is clicked", async () => {
    const { getByText } = customRender(<Home />);
    const goToTasks = getByText("VIEW TODAY's TASKS");
    await userEvent.click(goToTasks);
    expect(window.location.pathname).toEqual("/daily-tasks");
  });
});
