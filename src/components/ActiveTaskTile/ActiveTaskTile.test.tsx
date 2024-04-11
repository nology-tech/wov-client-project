import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActiveTaskTile from "./ActiveTaskTile";

describe("ActiveTaskTile component", () => {
  it("should render the active task tile", () => {
    render(
      <ActiveTaskTile
        requirement="5am wake up"
        category="Routine"
        points={5}
        classModifier={"active-task"}
      />
    );

    const activeTask = screen.getByTestId("active-task");
    expect(activeTask).toBeInTheDocument();
  });

  it("should render the requirement header", () => {
    render(
      <ActiveTaskTile requirement="5am wake up" category="Routine" points={5} classModifier={"active-task"} />
    );

    const requirement = screen.getByText("5am wake up");
    const category = screen.getByText("Routine");
    const points = screen.getByText("5 points");
    expect(requirement).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(points).toBeInTheDocument();
  });

  it("should check the initial state of the button", () => {
    render(
      <ActiveTaskTile
        requirement="requirement"
        category="category"
        points={5}
        classModifier={"active-task"}
      />
    );

    const checkboxInitial = screen.getByRole("checkbox");
    expect(checkboxInitial).not.toBeChecked();
  });

  it("should check the selected state of the button", async () => {

    render(
      <ActiveTaskTile
        requirement="requirement"
        category="category"
        points={5}
        classModifier={"active-task"}
      />
    );

    const checkboxSelected = screen.getByRole("checkbox");
    await userEvent.click(checkboxSelected);
    expect(checkboxSelected).toBeChecked();

    await userEvent.click(checkboxSelected);
    expect(checkboxSelected).not.toBeChecked();
  });
});
