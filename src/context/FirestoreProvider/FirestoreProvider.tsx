import React, { createContext, useState } from "react";
import {
  getDocumentFromFirestoreCollection,
  getCollectionFromFirestore,
  updateDocumentInFirestoreCollection,
  FirestoreCollections,
  createDocumentInFirestoreCollection,
} from "../../utils/dbUtils";
import { UserProfile } from "../../types/User";
import { CompletedTask, ActiveTask, Task } from "../../types/Task";
import { hasFetchedInLastFiveMinutes } from "../../utils/dateUtils";
import dayjs from "dayjs";
import { CreateDocumentResult, GroupData } from "../../types/Groups";
import { User } from "../../types/User";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from 'firebase/firestore';

export type FirestoreContextProps = {
  getActiveTasks: (userId: string) => ActiveTask[];
  completeActiveTask: (
    user: UserProfile,
    completedActiveTask: ActiveTask
  ) => Promise<void>;
  getCompletedTasks: (userId: string) => CompletedTask[];
  getLeaderboard: (tribe: string) => Promise<UserProfile[]>;
  getTribes: () => Promise<GroupData[]>;
  createGroup: (groupData: GroupData) => Promise<CreateDocumentResult>;
  getAllTasksAdmin: () => Promise<Task[]>;
  getAllUsersAdmin: () => Promise<User[]>;
  getAllGroupsAdmin: () => Promise<GroupData[]>;
  getAllMembers: (tribe: string) => Promise<string[]>
};

export const FirestoreContext = createContext<
  FirestoreContextProps | undefined
>(undefined);

type CachedData<T> = {
  data: T;
  lastFetched: null | Date;
};

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTasksCache, setActiveTasksCache] = useState<
    CachedData<ActiveTask[]>
  >({ data: [], lastFetched: null });
  const [completedTasksCache, setCompletedTasksCache] = useState<
    CachedData<CompletedTask[]>
  >({ data: [], lastFetched: null });

  const fetchActiveTasks = async (userId: string, date: Date) => {
    if (!userId) {
      return;
    }

    try {
      const activeTaskDocument = await getDocumentFromFirestoreCollection<{
        activeTasks: ActiveTask[];
      }>(FirestoreCollections.ACTIVE_TASKS, userId);
      const activeTasks = activeTaskDocument
        ? activeTaskDocument.activeTasks
        : ([] as ActiveTask[]);
      setActiveTasksCache({ data: activeTasks, lastFetched: date });
    } catch (error) {
      console.error("Error fetching active tasks:", error);
    }
  };

  const getActiveTasks = (userId: string) => {
    const now = new Date();

    if (hasFetchedInLastFiveMinutes(now, activeTasksCache.lastFetched)) {
      return activeTasksCache.data;
    } else {
      fetchActiveTasks(userId, now);
    }
    return activeTasksCache.data ?? ([] as ActiveTask[]);
  };

  const completeActiveTask = async (
    user: UserProfile,
    completedActiveTask: ActiveTask
  ) => {
    const today = new Date();
    const completed = dayjs(today).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z");
    const completedTask: CompletedTask = {
      ...completedActiveTask,
      completed,
      id: completedActiveTask.id + Date.now(),
    };

    await fetchCompletedTasks(user.id, today);

    setCompletedTasksCache((completedTaskData) => ({
      ...completedTaskData,
      data: [...completedTaskData.data, completedTask],
    }));

    const updatedCompleteTasks = [...completedTasksCache.data, completedTask];

    updateDocumentInFirestoreCollection(
      FirestoreCollections.COMPLETED_TASKS,
      user.id,
      {
        completedTasks: updatedCompleteTasks,
      }
    );

    removeActiveTask(user.id, completedActiveTask.id);
  };

  const removeActiveTask = async (userId: string, completedTaskId: string) => {
    if (!activeTasksCache) {
      return;
    }
    const updatedActiveTasks = activeTasksCache.data.filter(
      (task) => task.id !== completedTaskId
    );
    setActiveTasksCache((updatedActiveTaskData) => ({
      ...updatedActiveTaskData,
      data: updatedActiveTasks,
    }));
    updateDocumentInFirestoreCollection(
      FirestoreCollections.ACTIVE_TASKS,
      userId,
      {
        activeTasks: updatedActiveTasks,
      }
    );
  };

  const fetchCompletedTasks = async (userId: string, date: Date) => {
    if (!userId) {
      return;
    }

    try {
      const completedTaskDocument = await getDocumentFromFirestoreCollection<{
        completedTasks: CompletedTask[];
      }>(FirestoreCollections.COMPLETED_TASKS, userId);
      const completedTasks = completedTaskDocument
        ? completedTaskDocument.completedTasks
        : ([] as CompletedTask[]);
      setCompletedTasksCache({ data: completedTasks, lastFetched: date });
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const getCompletedTasks = (userId: string) => {
    const now = new Date();

    if (hasFetchedInLastFiveMinutes(now, completedTasksCache.lastFetched)) {
      return completedTasksCache.data;
    } else {
      fetchCompletedTasks(userId, now);
    }
    return completedTasksCache.data ?? ([] as CompletedTask[]);
  };

  const getLeaderboard = async (tribe: string) => {
    let result = [] as UserProfile[];
    try {
      const tribeDocument = await getCollectionFromFirestore<UserProfile>(
        FirestoreCollections.USERS
      );
      const userList = tribeDocument ?? ([] as UserProfile[]);
      const usersInTribe = userList.filter((user) => user.tribe === tribe);
      result = usersInTribe;
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
    return result;
  };


  const getAllMembers = async (tribe: string) => {
    if (!tribe) {
      return [] as UserProfile[];
    }

  
    try {
      const tribeRef = collection(db, FirestoreCollections.TRIBELIST); // Reference to the "tribes" collection
      const q = query(tribeRef, where('name', '==', tribe)); // Query to filter by tribe name
  
      const querySnapshot = await getDocs(q); // Execute the query and get snapshot of documents
  
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return [] as UserProfile[];
      }
  
      const tribeDoc = querySnapshot.docs[0]; // Assuming there's only one document per tribe
  
      // Access the "users" array field from the tribe document
      const users = tribeDoc.data().users || [];
      return users
  
      // Now you have the array of user IDs associated with the tribe
      // You can fetch user profiles using these IDs
  
      // For example, fetch user profiles using the IDs
      // const usersProfiles = await Promise.all(users.map(async (userId: string) => {
      //   const userDoc = await getDocumentFromFirestore(FirestoreCollections.USERS, userId); // Fetch user document
      //   return userDoc.data(); // Return user profile
      // }));
  
      // return usersProfiles as UserProfile[]; // Return array of user profiles
    } catch (error) {
      console.error("Error fetching members from tribe:", error);
      return [] as UserProfile[];
    }
  };
  

  const getTribes = async () => {
    let result = [] as GroupData[];
    try {
      const tribes = await getCollectionFromFirestore<GroupData>(
        FirestoreCollections.TRIBELIST
      );
      result = tribes ?? ([] as GroupData[]);
    } catch (error) {
      console.error("Error fetching list of Tribes:", error);
    }
    return result;
  };

  const createGroup = async (groupData: GroupData) => {
    try {
      const { name } = groupData;
      await createDocumentInFirestoreCollection(
        FirestoreCollections.TRIBELIST,
        name,
        groupData
      );

      return { error: null, created: true };
    } catch (error) {
      return { error: (error as Error).message, created: false };
    }
  };

  // const addToTribe = async(groupData: GroupData) => {
  //   const {name} = groupData;
  //   await createDocumentInFirestoreCollection(
  //     FirestoreCollections.TRIBELIST,
  //     name,
  //     name
  //   )
  // }



  const getAllTasksAdmin = async () => {
    let result = [] as Task[];
    try {
      const taskDocument = await getCollectionFromFirestore<Task>(
        FirestoreCollections.TASKS
      );
      const taskList = taskDocument ?? ([] as Task[]);
      result = taskList;
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
    return result;
  };

  const getAllGroupsAdmin = async () => {
    let result = [] as GroupData[];
    try {
      const tribeDocument = await getCollectionFromFirestore<GroupData>(
        FirestoreCollections.TRIBELIST
      );
      const tribeList = tribeDocument ?? ([] as GroupData[]);
      result = tribeList;
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
    return result;
  };

  const getAllUsersAdmin = async () => {
    let result = [] as User[];
    try {
      const tribeDocument = await getCollectionFromFirestore<User>(
        FirestoreCollections.USERS
      );
      const tribeList = tribeDocument ?? ([] as User[]);
      result = tribeList;
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
    return result;
  };

  return (
    <FirestoreContext.Provider
      value={{
        getActiveTasks,
        completeActiveTask,
        getCompletedTasks,
        getLeaderboard,
        getTribes,
        createGroup,
        getAllTasksAdmin,
        getAllGroupsAdmin,
        getAllUsersAdmin,
        getAllMembers
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
// function getDocumentFromFirestore(USERS: FirestoreCollections, userId: string) {
//   throw new Error("Function not implemented.");
// }

