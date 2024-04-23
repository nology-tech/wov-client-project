import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ActiveTasks from "./ActiveTasks";
import { customRender } from "../../utils/testUtils";
import { activeTasks } from "../../mockData/mockActiveTasks";
import { FirestoreContextProps } from "../../context/FirestoreProvider/FirestoreProvider";

describe("ActiveTask page component", () => {
  const mockFireStore = {
    getActiveTasks: (_: string) => activeTasks,
  } as FirestoreContextProps;

  it("should render the ActiveTask page", () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });
    const activeTask = screen.getByTestId("task-page");
    expect(activeTask).toBeInTheDocument();
  });

  it("should render the header component", () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

    const header = screen.getByText("WAY OF THE VIKING");
    expect(header).toBeInTheDocument();
  });

  it("should render the navigation component", () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

    const home = screen.getByText("Home");
    const tasks = screen.getByText("Tasks");
    const calendar = screen.getByText("Calendar");
    const leaderboard = screen.getByText("Leaderboard");
    expect(home).toBeInTheDocument();
    expect(tasks).toBeInTheDocument();
    expect(calendar).toBeInTheDocument();
    expect(leaderboard).toBeInTheDocument();
  });

  it("should check the initial state of the button", async () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

    const checkboxInitial = await screen.findAllByRole("checkbox");
    checkboxInitial.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it("should check the search input renders correct results", async () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

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

  it('displays "Task Completed" popup', async () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });

    await waitFor(() => screen.getAllByTestId("active-task"));

    const checkButtons = await screen.findAllByTestId("check-button");
    userEvent.click(checkButtons[0]);

    await waitFor(() =>
      expect(screen.getByTestId("popup")).toHaveTextContent("Task Completed")
    );
  });

  it('displays "Add Media" popup after opening first popup and clicking add media', async () => {
    customRender(<ActiveTasks />, {
      useRouting: true,
      firestoreValue: mockFireStore,
    });
    await waitFor(() => screen.getAllByTestId("active-task"));

    const checkButtons = await screen.findAllByTestId("check-button");
    userEvent.click(checkButtons[0]);

    await waitFor(() =>
      expect(screen.getByTestId("popup")).toHaveTextContent("Task Completed")
    );

    const addMediaButton = screen.getByText("ADD MEDIA");
    userEvent.click(addMediaButton);

    await waitFor(() =>
      expect(screen.getByTestId("popup")).toHaveTextContent("UPDATE TASK")
    );
  });
});
