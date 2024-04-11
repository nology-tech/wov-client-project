// import Layout from "../../components/Layout/Layout";
// import Header from "../../components/Header/Header";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Stack from "@mui/material/Stack";
import tasks from "../../data/completedTasks";
import CompletedTask from "../../components/CompletedTask/CompletedTask";

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

  return (
    <div>
      {/* <Header subtitle="Calendar" /> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="calendar"
          disableFuture
          views={["day"]}
          onChange={changeDate}
          //   dayOfWeekFormatter={(date: TDate) =>
          //     adapter.format(date, "weekdayShort").charAt(0).toUpperCase()
          //   }
          dayOfWeekFormatter={(weekday) =>
            `${weekday.format("ddd").toUpperCase()}`
          }
        />
      </LocalizationProvider>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <CompletedTask
            taskHeading={task.Title}
            category={task.category}
            points={task.points}
            description={task.desc}
            image={task.img}
          />
        ))}
        {/* <Item>Item 1</Item>
        <Item>Item 2</Item> */}
      </Stack>
    </div>
  );
};

export default Calendar;
