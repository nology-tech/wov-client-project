import { screen } from "@testing-library/react";
import Calendar from "./Calendar";
import { customRender } from "../../utils/testUtils";
import { CompletedTask } from "../../mockData/mockCompletedTasks";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

describe("Calendar page", () => {
  let mockData: CompletedTask[] = [];

  beforeAll(() => {
    dayjs.extend(updateLocale);
    dayjs.updateLocale("en", {
      weekStart: 1,
    });

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    mockData = [
      {
        id: "k2321",
        type: "daily",
        taskHeading: "5am wake up",
        category: "Routine",
        points: 5,
        completed: dayjs(today).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z"),
        description: "Example description",
      },
      {
        id: "8l213",
        type: "weekly",
        taskHeading: "Walk 70,000 steps",
        category: "Fitness",
        points: 30,
        completed: dayjs(yesterday).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z"),
        description: "Example description",
      },
    ];
  });

  it("should render the calender with the current date highlighted", () => {
    customRender(<Calendar completedTasks={mockData} />);
    const cal = screen.queryByTestId("calendarComponent");
    expect(cal).toBeInTheDocument();
    const today: number = new Date().getDate();
    const todayButton = screen.queryByText(`${today}`);
    expect(todayButton).toHaveClass("MuiPickersDay-today");
    expect(todayButton).toHaveClass("Mui-selected");
  });

  it("should render the current date completed tasks only", async () => {
    customRender(<Calendar completedTasks={mockData} />);
    const currentDateCompletedTaskHeading = await screen.findByText(
      /5am wake up/i
    );
    expect(currentDateCompletedTaskHeading).toBeInTheDocument();
    const differentDateCompleteTaskHeading =
      screen.queryByText(/walk 70,000 steps/i);
    expect(differentDateCompleteTaskHeading).toBeFalsy();
  });
});
