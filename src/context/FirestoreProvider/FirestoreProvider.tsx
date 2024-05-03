import React, { createContext, useState } from "react";
import {
  getDocumentFromFirestoreCollection,
  getCollectionFromFirestore,
  updateDocumentInFirestoreCollection,
  FirestoreCollections,
  createDocumentInFirestoreCollection,
} from "../../utils/dbUtils";
import { UserProfile } from "../../types/User";
import { CompletedTask, ActiveTask } from "../../types/Task";
import { hasFetchedInLastFiveMinutes } from "../../utils/dateUtils";
import dayjs from "dayjs";
import { GroupData, CreateDocumentResult } from "../../types/Groups";

export type FirestoreContextProps = {
  getActiveTasks: (userId: string) => ActiveTask[];
  completeActiveTask: (
    user: UserProfile,
    completedActiveTask: ActiveTask
  ) => Promise<void>;
  getCompletedTasks: (userId: string) => CompletedTask[];
  getLeaderboard: (tribe: string) => Promise<UserProfile[]>;
  getTribes: () => Promise<GroupData[]>;
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
    if (!tribe) {
      return [] as UserProfile[];
    }

    let result = [] as UserProfile[];
    try {
      const completedTaskDocument =
        await getCollectionFromFirestore<UserProfile>(
          FirestoreCollections.TRIBE
        );
      const userProfiles = completedTaskDocument ?? ([] as UserProfile[]);
      const tribeUsers = userProfiles.filter((user) => user.tribe === tribe);
      result = tribeUsers ?? ([] as UserProfile[]);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }

    return result;
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

  return (
    <FirestoreContext.Provider
      value={{
        getActiveTasks,
        completeActiveTask,
        getCompletedTasks,
        getLeaderboard,
        getTribes,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
