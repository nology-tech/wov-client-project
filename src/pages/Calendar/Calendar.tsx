import * as React from "react";
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
import { CompletedTask as CompletedTaskType } from "../../mockData/mockCompletedTasks";
import { app } from "../../firebase";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { doc, getDoc, DocumentReference } from "firebase/firestore";
import { ref } from "firebase/database";

type CalendarProps = {
  completedTasks: CompletedTaskType[];
};

const Calendar = ({ completedTasks }: CalendarProps) => {
  const [date, setDate] = React.useState<Date>(new Date());
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };

  const filteredCompletedTasks = filterCompletedTasks(completedTasks, date);
  const getData = async () => {
    try {
      console.log("RUNNING");
      const db = getFirestore(app);
      const completedTask = doc(
        db,
        "test-completed-tickets",
        "qDjHyzko7ehZKSOSHe0uHJ0KEjR2"
      );
      const completedTasksData = await getDoc(completedTask);
      if (completedTasksData.exists()) {
        const completedTaskArray = completedTasksData.data().completedTasks;
        console.log(completedTaskArray);
      }

      console.log(completedTasksData);
    } catch {
      console.log("error");
    }
  };
  React.useEffect(() => {
    getData();
  }, []);

  // const getTask = async () => {
  //   const db = getFirestore(app);
  //   const task = doc(db, "test-completed-tickets", "wake up ");
  //   const taskDoc = await getDoc(task);
  //   if (taskDoc.exists()) {
  //     console.log(taskDoc.data());
  //   } else {
  //     console.log("Error");
  //   }
  // };
  // getTask();

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
