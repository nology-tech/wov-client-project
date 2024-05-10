import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTask from "./CreateTask";

describe("Create Task Component", () => {
  it("should render the Create Task Component", async () => {
    render(<CreateTask buttonLabel="Create" />);

    const name = screen.getByText("Name");
    const category = screen.getByText("Category");
    const description = screen.getByText("Description");
    const points = screen.getByText("Points");

    expect(name).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(points).toBeInTheDocument();
  });

  it("should throw error message if any input is missing", async () => {
    render(<CreateTask buttonLabel="Create" />);

    const name = screen.getByTestId("name-input");

    await fireEvent.change(name, { target: { value: "Bench Press" } });

    await fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(
        screen.getByText("Please fill all required fields.")
      ).toBeInTheDocument();
    });
  });
});
