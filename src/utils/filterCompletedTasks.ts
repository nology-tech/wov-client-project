import dayjs from "dayjs";
import { CompletedTask } from "../types/Task";

const filterCompletedTasks = (
  completedTasks: CompletedTask[],
  date: Date
): CompletedTask[] => {
  return completedTasks.filter((task) => {
    const newDateFormat = dayjs(date).format("D MMMM YYYY");
    const hasNewDateFormat = task.completed.includes(newDateFormat);
    return hasNewDateFormat;
  });
};

export default filterCompletedTasks;
