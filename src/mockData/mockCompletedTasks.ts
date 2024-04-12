type CompletedTask = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
  completed: string;
  description?: string;
  image?: string;
}

// NOTE:
// Completed tasks will be stored per user, these are a list of tasks for a single user
//

const completedTasks: CompletedTask[] = [
  {
    id: "12321",
    type: "daily",
    taskHeading: "5am wake up",
    category: "Routine",
    points: 5,
    completed: "12 April 2024 at 05:20:00 UTC+1",
    description: "Example description",
  },
  {
    id: "83213",
    type: "weekly",
    taskHeading: "Walk 70,000 steps",
    category: "Fitness",
    points: 30,
    completed: "10 April 2024 at 10:20:00 UTC+1",
    description: "Example description",
  },
  {
    id: "44513",
    type: "daily",
    taskHeading: "Cold shower",
    category: "Routine",
    points: 7,
    completed: "12 April 2024 at 06:40:00 UTC+1",
    description: "Example description",
  },
  {
    id: "12049",
    type: "daily",
    taskHeading: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    completed: "12 April 2024 at 06:50:00 UTC+1",
    description: "Example description",
  },
  {
    id: "85556",
    type: "daily",
    taskHeading: "1 hour exercise",
    category: "Fitness",
    points: 30,
    completed: "12 April 2024 at 10:20:00 UTC+1",
    description: "Example description",
  }
]
