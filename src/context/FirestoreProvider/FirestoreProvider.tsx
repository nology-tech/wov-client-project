import React, { createContext, useState } from "react";
import {
  getDocumentFromFirestoreCollection,
  getCollectionFromFirestore,
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
import { collection, getDocs, query, where, doc, addDoc, deleteDoc } from 'firebase/firestore';

export type FirestoreContextProps = {

  completeActiveTask: (
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
  // const [activeTasksCache, setActiveTasksCache] = useState<
  //   CachedData<ActiveTask[]>
  // >({ data: [], lastFetched: null });
  const [completedTasksCache, setCompletedTasksCache] = useState<
    CachedData<CompletedTask[]>
  >({ data: [], lastFetched: null });

  // const fetchActiveTasks = async (userId: string) => {    
  //   if (!userId) {
  //     return;
  //   }

  //   try {
  //     //LEAVING THIS HERE FOR REF AT THE MOMENT
  //     // const activeTaskDocument = await getDocumentFromFirestoreCollection<{
  //     //   activeTasks: ActiveTask[];
  //     // }>(FirestoreCollections.ACTIVE_TASKS, userId);
  //     // const activeTasks = activeTaskDocument
  //     //   ? activeTaskDocument.activeTasks
  //     //   : ([] as ActiveTask[]);
  //     // setActiveTasksCache({ data: activeTasks, lastFetched: date });
  //  const userDoc = doc(db, "users", userId)
  //  const userSnap = await getDoc(userDoc)

  //  if(userSnap.exists()){
  //   const userData = userSnap.data()
  //   // setActiveTasksCache({data: userData.task, lastFetched: date})
  //   return {data: userData.task}
  //  } else {
  //   console.error("error fetching user")
  //  }
  //   } catch (error) {
  //     console.error("Error fetching active tasks:", error);
  //   }
  // };

  // const getActiveTasks = (userId: string) => {
  //   const now = new Date();

  //   if (hasFetchedInLastFiveMinutes(now, activeTasksCache.lastFetched)) {
  //     return activeTasksCache.data;
  //   } else {
  //     fetchActiveTasks(userId);
  //   }
  //   return activeTasksCache.data ?? ([] as ActiveTask[]);
  // };

  const completeActiveTask = async (
    completedActiveTask: ActiveTask
  ) => {
    const today = new Date();
    const completed = dayjs(today).format("D MMMM YYYY [at] HH:mm:ss [UTC]Z");
    const completedTask: CompletedTask = {
      ...completedActiveTask,
      completed,
      id: completedActiveTask.id + Date.now(),
    };
    
// not sure if this is needed here, EDIT: none of these work
    // await fetchCompletedTasks(user.id, today);

    setCompletedTasksCache((completedTaskData) => ({
      ...completedTaskData,
      data: [...completedTaskData.data, completedTask],
    }));    

    const updatedCompleteTasks = [...completedTasksCache.data, completedTask];

    // this needs to create a document as it's a new one each time
    await addDoc(collection(db, FirestoreCollections.COMPLETED_TASKS), updatedCompleteTasks[0])

    
    // Delete the task from the active task collection, using the unique task id for each task stored on the document
    // need to query active tasks collection and then remove the doc
    const activeTaskRef = collection(db, FirestoreCollections.ACTIVE_TASKS)
    const activeTask = query(activeTaskRef, where("taskId", "==",  updatedCompleteTasks[0].taskId))
    const querySnapshot = await getDocs(activeTask)  
    querySnapshot.forEach((docu)=> {
          deleteDoc(doc(db, FirestoreCollections.ACTIVE_TASKS, docu.id ))
    })
  };

  // const removeActiveTask = async (userId: string, completedTaskId: string) => {
  //   if (!activeTasksCache) {
  //     return;
  //   }
  //   const updatedActiveTasks = activeTasksCache.data.filter(
  //     (task) => task.id !== completedTaskId
  //   );
  //   setActiveTasksCache((updatedActiveTaskData) => ({
  //     ...updatedActiveTaskData,
  //     data: updatedActiveTasks,
  //   }));
  //   updateDocumentInFirestoreCollection(
  //     FirestoreCollections.ACTIVE_TASKS,
  //     userId,
  //     {
  //       activeTasks: updatedActiveTasks,
  //     }
  //   );
  // };

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
        console.error('No matching documents.');
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

