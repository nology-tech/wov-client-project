import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Stack from "@mui/material/Stack";
import tasks from "../../data/completedTasks";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import { Divider } from "@mui/material";

const Calendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };
  console.log(date);
  const filteredCompletedTasks = tasks.filter(
    (task) => task.completedDate.toDateString() == date.toDateString()
  );

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="calendar"
          disableFuture
          views={["day"]}
          onChange={changeDate}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(weekday) =>
            `${weekday.format("ddd").toUpperCase()}`
          }
        />
      </LocalizationProvider>

      <Stack spacing={2} divider={<Divider flexItem />}>
        {filteredCompletedTasks.map((task) => (
          <CompletedTask
            taskHeading={task.Title}
            category={task.category}
            points={task.points}
            description={task.desc}
            image={task.img}
          />
        ))}
      </Stack>
    </div>
  );
};

export default Calendar;
