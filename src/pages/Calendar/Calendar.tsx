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
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FirestoreCollections } from "../../utils/dbUtils";
import { db } from "../../firebase";
import { ActiveTask } from "../../types/Task";



const Calendar = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const [date, setDate] = useState<Date>(new Date());
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };
  const [ completedTasks, setCompletedTasks] = useState<ActiveTask[]>([])

  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  const getCompletedTasks = async() => {

    const taskRef = collection(db, FirestoreCollections.COMPLETED_TASKS)
    const taskQuery = query(taskRef, where("userId", "==", user.id))
    const taskSnap = await getDocs(taskQuery) 

    if(taskSnap.docs.length > 0){
      const activeTasksData = taskSnap.docs.map((doc)=> {
        return doc.data()
      });      
      
      const todaysTasks = activeTasksData.filter((task)=> {
        // this is funky couldn't work out a better way, works for now
        const completedTaskDate = `${task.dateAssigned.toDate().getDay()}${task.dateAssigned.toDate().getMonth()}${task.dateAssigned.toDate().getFullYear()}`
        const calendarDate = `${date.getDay()}${date.getMonth()}${date.getFullYear()}`

        if(completedTaskDate === calendarDate) {
          return task
        }
      }) as ActiveTask[];
      
      setCompletedTasks(todaysTasks)
    }

  }

  useEffect(()=> {
getCompletedTasks()
  },
      // eslint-disable-next-line
  [date])



  return (
    <div className="calendar">
      <Header subtitle={"Calendar"} profileImage={user.img} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="calendar__calendar"
          sx={{
            "@media (min-width: 1440px)": {
              transform: "scale(1.3)",
            },
            "@media (min-width: 2560px)": {
              transform: "scale(2.6)",
              "margin-top": "220px",
            },
          }}
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
        sx={{
          "@media (min-width: 1440px)": {
            "margin-top": "60px",
            "font-size": "1.25rem",
          },
          "@media (min-width: 2560px)": {
            "margin-top": "280px",
            "font-size": "2.6rem",
          },
        }}
        className="calendar__task-container"
      >
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <CompletedTask
              key={task.id}
              taskHeading={task.taskHeading}
              category={task.category}
              points={task.points}
              description={task.description}
              image={""}
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
