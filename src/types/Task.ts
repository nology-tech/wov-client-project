export type ActiveTask = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
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
}

export type Task = {
  id: string,
  category: string;
  date: string;
  description: string;
  name: string;
  points: number;
};
