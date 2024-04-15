import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActiveTasks from "./ActiveTasks";
import { customRender } from "../../utils/testUtils";
import { activeTasks } from "../../mockData/mockActiveTasks";

describe("ActiveTask page component", () => {
  it("should render the ActiveTask page", () => {
    customRender(<ActiveTasks />);

    const activeTask = screen.getByTestId("task-page");
    expect(activeTask).toBeInTheDocument();
  });

  it("should render the header component", () => {
    customRender(<ActiveTasks />);

    const header = screen.getByText("WAY OF THE VIKING");
    expect(header).toBeInTheDocument();
  });

  it("should render the navigation component", () => {
    customRender(<ActiveTasks />);

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
    customRender(<ActiveTasks />);

    const checkboxInitial = screen.getAllByRole("checkbox");
    checkboxInitial.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("should check the search input renders correct results", async () => {
    customRender(<ActiveTasks />);

    const searchInput = screen.getByRole("search");
    await userEvent.type(searchInput, "di");

    const filteredTasks = activeTasks.filter(
      (task) =>
        task.taskHeading.toLowerCase().includes("di") ||
        task.category?.toLowerCase().includes("di")
    );
    const unexpectedTasks = [
      "5am wake up",
      "Walk 70,000 steps",
      "20 minute run",
    ];

    filteredTasks.forEach((task) => {
      expect(screen.getByText(task.taskHeading)).toBeInTheDocument();
      unexpectedTasks.forEach((noTask) => {
        expect(screen.getByText(noTask)).not.toBeInTheDocument;
      });
    });
  });
});
