import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Stack from "@mui/material/Stack";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import { Divider } from "@mui/material";
import Navigation from "../../components/Navigation/Navigation";
import Header from "../../components/Header/Header";
import "./Calendar.scss";
import filterCompletedTasks from "../../utils/filterCompletedTasks";
import { useFirestore } from "../../hooks/useFireStore";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Calendar = () => {
  const { getCompletedTasks } = useFirestore();
  const { getUser } = useAuth();
  const user = getUser();
  const completedTasks = getCompletedTasks(user.id);
  const [date, setDate] = useState<Date>(new Date());
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };

  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  const filteredCompletedTasks = filterCompletedTasks(completedTasks, date);

  return (
    <div className="calendar">
      <Header subtitle={"Calendar"} profileImage={user.img} />
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
          value={dayjs(
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
        {filteredCompletedTasks.length > 0 ? (
          filteredCompletedTasks.map((task) => (
            <CompletedTask
              key={task.id}
              taskHeading={task.taskHeading}
              category={task.category}
              points={task.points}
              description={task.description}
              image={task.image}
            />
          ))
        ) : (
          <p className="calendar__no-tasks-message">
            No completed tasks to display.
          </p>
        )}
      </Stack>
      <Navigation navActionIndex={2} />
    </div>
  );
};

export default Calendar;
