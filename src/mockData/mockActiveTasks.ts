type Task = {
  id: string;
  taskHeading: string;
  type?: "weekly" | "daily" | "monthly";
  category?: string;
  points: number;
}

// NOTE:
// Active tasks will be stored per user, these are a list of tasks for a single user
//

const activeTasks: Task[] = [
  {
    id: "k2321",
    type: "daily",
    taskHeading: "5am wake up",
    category: "Routine",
    points: 5,
  },
  {
    id: "8l213",
    type: "weekly",
    taskHeading: "Walk 70,000 steps",
    category: "Fitness",
    points: 30,
  },
  {
    id: "44c13",
    type: "daily",
    taskHeading: "Cold shower",
    category: "Routine",
    points: 7,
  },
  {
    id: "12i49",
    type: "daily",
    taskHeading: "10 minutes meditation",
    category: "Wellness",
    points: 3,
  },
  {
    id: "85z56",
    type: "daily",
    taskHeading: "",
    category: "Fitness",
    points: 30,
  }
]
