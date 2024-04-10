import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./Navigation";
import { customRender } from "../../utils/testUtils";

describe("Navigation component", () => {
  it("renders navigation items correctly", async () => {
    customRender(<Navigation navActionIndex={0} />);
  });

  it("changes color when a navigation item is clicked", () => {
    const { getByText } = customRender(<Navigation navActionIndex={0} />);

    const tasksNavItem = getByText("Tasks");
    tasksNavItem.click();

    expect(tasksNavItem).toHaveClass(
      "MuiBottomNavigationAction-label css-imwso6-MuiBottomNavigationAction-label"
    );
  });
  it("activates the correct link when clicked", async () => {
    const { getByText } = customRender(<Navigation navActionIndex={0} />);

    await userEvent.click(getByText("Tasks"));

    expect(getByText("Tasks")).toHaveClass("Mui-selected");
  });
  it("navigates to the correct link upon click", async () => {
    customRender(<Navigation navActionIndex={0} />);

    await userEvent.click(screen.getByText("Tasks"));

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/tasks");
    });
  });
});
