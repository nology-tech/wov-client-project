import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Stack from "@mui/material/Stack";
import tasks, { Tasks } from "../../data/completedTasks";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import { Divider } from "@mui/material";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import "./Calendar.scss";

export const filterCompletedTasks = (tasks: Tasks[], date: Date): Tasks[] => {
  return tasks.filter(
    (task) => task.completedDate.toDateString() == date.toDateString()
  );
};

const Calendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };

  const filteredCompletedTasks = filterCompletedTasks(tasks, date);

  return (
    <div className="calendar">
      <Header subtitle={"Calendar"} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="calendar__calendar"
          disableFuture
          views={["day"]}
          onChange={changeDate}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(weekday) =>
            `${weekday.format("ddd").toUpperCase()}`
          }
          defaultValue={dayjs(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          )}
          data-testid="calendarComponent" 
        />
      </LocalizationProvider>

      <Stack
        spacing={2}
        divider={<Divider flexItem />}
        className="calendar__task-container"
      >
        {filteredCompletedTasks.map((task, index) => (
          <CompletedTask
            key={index}
            taskHeading={task.Title}
            category={task.category}
            points={task.points}
            description={task.desc}
            image={task.img}
          />
        ))}
      </Stack>
      <Navigation navActionIndex={2} />
    </div>
  );
};

export default Calendar;
