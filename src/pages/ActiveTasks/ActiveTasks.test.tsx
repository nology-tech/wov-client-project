import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActiveTasks from "./ActiveTasks";
import tasks from "../../MockData/tasks";
import { MemoryRouter } from "react-router-dom";

describe("ActiveTask page component", () => {
  it("should render the ActiveTask page", () => {
    render(
      <MemoryRouter>
        <ActiveTasks />
      </MemoryRouter>
    );

    const activeTask = screen.getByTestId("task-page");
    expect(activeTask).toBeInTheDocument();
  });

  it("should render the header component", () => {
    render(
      <MemoryRouter>
        <ActiveTasks />
      </MemoryRouter>
    );

    const header = screen.getByText("WAY OF THE VIKING");
    expect(header).toBeInTheDocument();
    console.log(header);
  });

  it("should render the navigation component", () => {
    render(
      <MemoryRouter>
        <ActiveTasks />
      </MemoryRouter>
    );

    const home = screen.getByText("Home");
    const tasks = screen.getByText("Tasks");
    const calendar = screen.getByText("Calendar");
    const leaderboard = screen.getByText("Leaderboard");
    expect(home).toBeInTheDocument();
    expect(tasks).toBeInTheDocument();
    expect(calendar).toBeInTheDocument();
    expect(leaderboard).toBeInTheDocument();
  });

  it("should check the initial state of the button", () => {
    render(
      <MemoryRouter>
        <ActiveTasks />
      </MemoryRouter>
    );

    const checkboxInitial = screen.getAllByRole("checkbox");
    checkboxInitial.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("should check the search input renders correct results", async () => {
    render(
      <MemoryRouter>
        <ActiveTasks />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole("search");

    await userEvent.type(searchInput, "di");

    const filteredTasks = tasks.filter(
      (task) =>
        task.requirement.toLowerCase().includes("di") ||
        task.category.toLowerCase().includes("di")
    );
    const unexpectedTasks = [
      "5am wake up",
      "Cold shower",
      "1 hour exercise",
      "5k Run",
      "1 hour walk",
    ];

    filteredTasks.forEach((task) => {
      expect(screen.getByText(task.requirement)).toBeInTheDocument();
      unexpectedTasks.forEach((noTask) => {
        expect(screen.getByText(noTask)).not.toBeInTheDocument;
      });
    });
  });
});
