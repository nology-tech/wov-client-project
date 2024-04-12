import { screen } from "@testing-library/react";
import Calendar from "./Calendar";
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
