import { CompletedTask } from "../tempname/mockCompletedTasks";

const filterCompletedTasks = (
  completedTasks: CompletedTask[],
  date: Date
): CompletedTask[] => {
  return completedTasks.filter((task) => {
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const newDateFormat = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
    const hasNewDateFormat = task.completed.includes(newDateFormat);

    return hasNewDateFormat;
  });
};

export default filterCompletedTasks;
