import { Tasks } from "../../data/completedTasks";

const filterCompletedTasks = (tasks: Tasks[], date: Date): Tasks[] => {
  return tasks.filter(
    (task) => task.completedDate.toDateString() == date.toDateString()
  );
};

export default filterCompletedTasks;
