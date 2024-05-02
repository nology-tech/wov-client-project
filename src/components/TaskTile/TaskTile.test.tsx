import { render, screen } from '@testing-library/react';
import TaskTile from "./TaskTile";
describe("TaskTile component", () => {
    it("Should render the task tile on page", () => {
      const { container } = render(
        <TaskTile
          id='1'
          name="5am wake up"
          requirement="Daily"
          category="Routine"
          points={7}
        />
      );
      expect(container.firstChild).toHaveClass("task-tile");
    });
    it("Should render the correct headings for name, requirement, category and points", () => {
        render(
            <TaskTile
            id='1'
            name="5am wake up"
            requirement="Daily"
            category="Routine"
            points={5}
          />
        );
        const name = screen.getByText("5am wake up");
        const category_Requirement = screen.getByText("Routine | Daily");
        const points = screen.getByText("5 points");
        expect(name).toBeInTheDocument();
        expect(category_Requirement).toBeInTheDocument();
        expect(points).toBeInTheDocument();
    });
    it("Should check the initial state of the button", () => {
      render(
        <TaskTile
          id='1'
          name="5am wake up"
          requirement="Daily"
          category="Routine"
          points={5}
        />
      );
      const buttonInitial = screen.getByRole("button");
      expect(buttonInitial).toBeInTheDocument();
    });
    it("Should check and render the text of the button", () => {
        render(
          <TaskTile
            id='1'
            name="5am wake up"
            requirement="Daily"
            category="Routine"
            points={5}
          />
        );
        const buttonText = screen.getByText("EDIT");
        expect(buttonText).toBeInTheDocument();
    });
});