import React, { createContext, useState } from "react";
import {
  getDocumentFromFirestoreCollection,
  getCollectionFromFirestore,
} from "../../utils/dbUtils";
import { UserProfile } from "../../types/User";
import { CompletedTask, ActiveTask } from "../../types/Task";

export type FirestoreContextProps = {
  getActiveTasks: (
    userId: string,
    updateCache?: boolean
  ) => Promise<ActiveTask[]>;
  getCompletedTasks: (
    userId: string,
    updateCache?: boolean
  ) => Promise<CompletedTask[]>;
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
  const [leaderBoardCache, setLeaderBoardCache] = useState<UserProfile[]>([]);

  const getActiveTasks = async (userId: string, updateCache = false) => {
    if (activeTasksCache.length != 0 && !updateCache) {
      return activeTasksCache;
    }
    try {
      const activeTaskDocument = await getDocumentFromFirestoreCollection<{
        activeTasks: ActiveTask[];
      }>("test-active-tasks", userId);
      const activeTasks = activeTaskDocument
        ? activeTaskDocument.activeTasks
        : ([] as ActiveTask[]);
      setActiveTasksCache(activeTasks);
    } catch (error) {
      console.error("Error fetching active tasks:", error);
    }
    return activeTasksCache;
  };

  const getCompletedTasks = async (userId: string, updateCache = false) => {
    if (completedTasksCache.length !== 0 && !updateCache) {
      return completedTasksCache;
    }
    try {
      const completedTaskDocument = await getDocumentFromFirestoreCollection<{
        completedTasks: CompletedTask[];
      }>("test-completed-tasks", userId);
      const completedTasks = completedTaskDocument
        ? completedTaskDocument.completedTasks
        : ([] as CompletedTask[]);
      setCompletedTasksCache(completedTasks);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
    return completedTasksCache;
  };

  const getLeaderboard = async (tribe: string, updateCache = false) => {
    if (leaderBoardCache.length != 0 && !updateCache) {
      return leaderBoardCache;
    }

    try {
      const completedTaskDocument =
        await getCollectionFromFirestore<UserProfile>(tribe);
      const userProfiles = completedTaskDocument ?? ([] as UserProfile[]);
      setLeaderBoardCache(userProfiles);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }

    return leaderBoardCache;
  };

  return (
    <FirestoreContext.Provider
      value={{ getActiveTasks, getCompletedTasks, getLeaderboard }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};
