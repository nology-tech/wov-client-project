import { Timestamp } from "firebase/firestore";

export type ActiveTask = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
  dateAssigned: Timestamp;
  description: string;
  name: string;
  completed?: string
  taskId?: string
};

export type CompletedTask = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
  completed: string;
  description?: string;
  image?: string;
  taskId?: string
}

export type Task = {
  id: string,
  category: string;
  description: string;
  name: string;
  points: number;
  dateAssigned: Timestamp;
  completed?: boolean;
};
