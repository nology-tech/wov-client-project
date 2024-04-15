import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActiveTaskTile from "./ActiveTaskTile";
import { useState } from "react";

describe("ActiveTaskTile component", () => {
  it("should render the active task tile", () => {
    render(
      <ActiveTaskTile
        id={"k2321"}
        requirement="5am wake up"
        category="Routine"
        points={5}
        classModifier={"active-task"}
        completed={false}
        onCompletionChange={() => console.log("Completion change")}
      />
    );

    const activeTask = screen.getByTestId("active-task");
    expect(activeTask).toBeInTheDocument();
  });

  it("should render the requirement header", () => {
    render(
      <ActiveTaskTile
        id={"k2321"}
        requirement="5am wake up"
        category="Routine"
        points={5}
        classModifier={"active-task"}
        completed={false}
        onCompletionChange={() => console.log("Completion change")}
      />
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
        id={"k2321"}
        requirement="5am wake up"
        category="Routine"
        points={5}
        classModifier={"active-task"}
        completed={false}
        onCompletionChange={() => console.log("Completion change")}
      />
    );

    const checkboxInitial = screen.getByRole("checkbox");
    expect(checkboxInitial).not.toBeChecked();
  });

  it("should check the selected state of the button", async () => {
    const TestComponent = () => {
      const [completedTasks, setCompletedTasks] = useState<{
        [key: string]: boolean;
      }>({});

      const handleTaskCompletionChange = (id: string, isCompleted: boolean) => {
        setCompletedTasks((prev) => ({ ...prev, [id]: isCompleted }));
      };

      return (
        <ActiveTaskTile
          id={"k2321"}
          requirement="5am wake up"
          category="Routine"
          points={5}
          classModifier="active-task"
          completed={!!completedTasks["k2321"]}
          onCompletionChange={handleTaskCompletionChange}
        />
      );
    };

    render(<TestComponent />);

    const checkboxSelected = screen.getByRole("checkbox");
    await userEvent.click(checkboxSelected);
    expect(checkboxSelected).toBeChecked();

    await userEvent.click(checkboxSelected);
    expect(checkboxSelected).not.toBeChecked();
    
  });
});
