import { db } from "../../firebase";
import {
  doc,
  collection,
  getDocs,
  getFirestore,
  query,
  getDoc,
} from "firebase/firestore";

import { Task } from "../../mockData/mockActiveTasks";

export const getActiveTasks = async (): Promise<Task[]> => {
  const retrievalReference = doc(
    db,
    "test-active-tasks",
    "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"
  );
  const retrieveTasks = await getDoc(retrievalReference);
  let tasks: Task[] = [];

  if (retrieveTasks.exists()) {
    const data = await retrieveTasks.data();
    tasks = data.activeTasks;
  }

  console.log({ tasks });

  return tasks;
};
