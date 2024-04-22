import React, { createContext, useState } from "react";
import {
  getDocumentFromFirestoreCollection,
  getCollectionFromFirestore,
  updateDocumentInFirestoreCollection,
  FirestoreCollections,
} from "../../utils/dbUtils";
import { UserProfile } from "../../types/User";
import { CompletedTask, ActiveTask } from "../../types/Task";
import dayjs from "dayjs";

export type FirestoreContextProps = {
  getActiveTasks: (userId: string, updateCache?: boolean) => ActiveTask[];
  completeActiveTask: (
    user: UserProfile,
    completedActiveTask: ActiveTask
  ) => Promise<void>;
  getCompletedTasks: (userId: string, updateCache?: boolean) => CompletedTask[];
  getLeaderboard: (
    tribe: string,
    updateCache?: boolean
  ) => Promise<UserProfile[]>;
};

export const FirestoreContext = createContext<
  FirestoreContextProps | undefined
>(undefined);

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeTasksCache, setActiveTasksCache] = useState<ActiveTask[]>([]);
  const [completedTasksCache, setCompletedTasksCache] = useState<
    CompletedTask[]
  >([]);

  const fetchActiveTasks = async (userId: string) => {
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
      setActiveTasksCache(activeTasks);
    } catch (error) {
      console.error("Error fetching active tasks:", error);
    }
  };

  const getActiveTasks = (userId: string, updateCache = false) => {
    if (activeTasksCache.length > 0 && !updateCache) {
      return activeTasksCache;
    } else {
      fetchActiveTasks(userId);
    }
    return activeTasksCache ?? ([] as ActiveTask[]);
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

    await fetchCompletedTasks(user.id);

    setCompletedTasksCache((completedTaskData) => [
      ...completedTaskData,
      completedTask,
    ]);

    const updatedCompleteTasks = [...completedTasksCache, completedTask];

    updateDocumentInFirestoreCollection(FirestoreCollections.COMPLETED_TASKS, user.id, {
      completedTasks: updatedCompleteTasks,
    });

    removeActiveTask(user.id, completedActiveTask.id);
  };

  const removeActiveTask = async (userId: string, completedTaskId: string) => {
    if (!activeTasksCache) {
      return;
    }
    const updatedActiveTasks = activeTasksCache.filter(
      (task) => task.id !== completedTaskId
    );
    setActiveTasksCache(updatedActiveTasks);
    updateDocumentInFirestoreCollection(FirestoreCollections.ACTIVE_TASKS, userId, {
      activeTasks: updatedActiveTasks,
    });
  };

  const fetchCompletedTasks = async (userId: string) => {
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
      setCompletedTasksCache(completedTasks);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const getCompletedTasks = (userId: string, updateCache = false) => {
    if (completedTasksCache.length > 0 && !updateCache) {
      return completedTasksCache;
    } else {
      fetchCompletedTasks(userId);
    }
    return completedTasksCache ?? ([] as CompletedTask[]);
  };

  const getLeaderboard = async (tribe: string) => {
    if (!tribe) {
      return [] as UserProfile[];
    }

    let result = [] as UserProfile[];
    try {
      const completedTaskDocument =
        await getCollectionFromFirestore<UserProfile>(FirestoreCollections.TRIBE);
      const userProfiles = completedTaskDocument ?? ([] as UserProfile[]);
      const tribeUsers = userProfiles.filter((user) => user.tribe === tribe);
      result = tribeUsers ?? ([] as UserProfile[]);
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
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
