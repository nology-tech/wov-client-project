export type ActiveTask = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
}

export type SetTask = {
  id: string;
  category: string;
  date: string;
  description: string;
  name: string;
  points: string;
}

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
