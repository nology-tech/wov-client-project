import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import Header from "../../components/Header/Header";
import "./CalendarAdmin.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import TaskTile from "../../components/TaskTile/TaskTile";
import { FirestoreCollections, getCollectionFromFirestore } from "../../utils/dbUtils";
import { SetTask } from "../../types/Task";


const CalendarAdmin = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentTasks, setCurrentTasks] = useState<SetTask[]>([])
  const { getUser } = useAuth();
  const user = getUser();
  const [date, setDate] = useState<Date>(new Date());
  const changeDate = (value: Dayjs) => {
    setDate(new Date(value.year(), value.month(), value.date()));
  };

  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  const getSetTasks = async () => {
    try {
      const setTasks: SetTask[] | null = await getCollectionFromFirestore (
        FirestoreCollections.TEST_TASKS
      )
      if(setTasks === null){
        setErrorMessage("No set tasks have been found")
        return;
      }
      setCurrentTasks(setTasks)
      console.log(currentTasks);
      
      return setTasks;
      
    } catch(error) {
      setErrorMessage("Error fetching tasks");
    }
  }

  useEffect(()=> {
    getSetTasks();
  }, [])
  // should i have use effect?


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

        {/* check whether docs for each task created has an id so that 
        I can give a key to the task tile */}
        {currentTasks ? (
          currentTasks.map((task) => (
            <TaskTile
              key={task.id}
              id={task.id}
              name={task.name}
              requirement=""
              category={task.category}
              points={parseFloat(task.points)}
              />
          ))
        ) : (
          <p className="calendar__no-tasks-message">
            {errorMessage}
          </p>
        )}
      </Stack>
      <NavigationAdmin navActionIndex={4} />
    </div>
  );
};

export default CalendarAdmin;
