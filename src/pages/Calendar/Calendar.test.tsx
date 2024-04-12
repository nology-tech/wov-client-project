import { screen } from "@testing-library/react";
import Calendar, { filterCompletedTasks } from "./Calendar";
import tasks from "../../data/completedTasks";
import { customRender } from "../../utils/testUtils";

describe("Calendar page", () => {
  it("should render the calender with the current date highlighted", () => {
    customRender(<Calendar />);
    const cal = screen.queryByTestId("calendarComponent");
    expect(cal).toBeInTheDocument();
    const today: number = new Date().getDate();
    const todayButton = screen.queryByText(`${today}`);
    expect(todayButton).toHaveClass("MuiPickersDay-today");
    expect(todayButton).toHaveClass("Mui-selected");
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

  it("should return an empty array when an empty array is given", () => {
     const filteredData = filterCompletedTasks([], new Date(2024, 3, 11));

    expect(filteredData).toEqual([]);
  });
});
