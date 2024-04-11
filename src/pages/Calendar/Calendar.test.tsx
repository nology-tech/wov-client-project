import { fireEvent, render, screen } from "@testing-library/react";
import { Calendar, filterCompletedTasks } from "./Calendar";
import tasks from "../../data/completedTasks";

describe("Completed Task Component", () => {
  it("should render the calender with the current date highlighted", () => {
    render(<Calendar />);
  });
});

describe("Filter completed tasks function", () => {
  it("should filter the tasks for the date given", () => {
    const filteredData11 = filterCompletedTasks(tasks, new Date(2024, 3, 11));
    const filteredData10 = filterCompletedTasks(tasks, new Date(2024, 3, 10));
    const filteredData9 = filterCompletedTasks(tasks, new Date(2024, 3, 9));
    const filteredData8 = filterCompletedTasks(tasks, new Date(2024, 3, 8));

    expect(filteredData11.length).toBe(3);
    expect(filteredData10.length).toBe(2);
    expect(filteredData9.length).toBe(1);
    expect(filteredData8.length).toBe(1);
  });

  it("shouldn't modify the original array", () => {
    const originalData = [...tasks];
    filterCompletedTasks(tasks, new Date(2024, 3, 11));

    expect(tasks).toEqual(originalData);
  });
});
