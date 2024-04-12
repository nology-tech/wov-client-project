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

// NOTE:
// Completed tasks will be stored per user, these are a list of tasks for a single user
//

export const completedTasks: CompletedTask[] = [
  {
    id: "k2321",
    type: "daily",
    taskHeading: "5am wake up",
    category: "Routine",
    points: 5,
    completed: "12 April 2024 at 05:20:00 UTC+1",
    description: "Example description",
  },
  {
    id: "8l213",
    type: "weekly",
    taskHeading: "Walk 70,000 steps",
    category: "Fitness",
    points: 30,
    completed: "10 April 2024 at 10:20:00 UTC+1",
    description: "Example description",
  },
  {
    id: "44c13",
    type: "daily",
    taskHeading: "Cold shower",
    category: "Routine",
    points: 7,
    completed: "12 April 2024 at 06:40:00 UTC+1",
    description: "Example description",
  },
  {
    id: "12i49",
    type: "daily",
    taskHeading: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    completed: "12 April 2024 at 06:50:00 UTC+1",
    description: "Example description",
    image: "https://www.cancer.org/adobe/dynamicmedia/deliver/dm-aid--c705d936-4526-4d8f-a221-455a9c0a8ed5/man-meditating-outside-restricted.jpg?quality=82&width=1280&preferwebp=true"
  },
  {
    id: "85z56",
    type: "daily",
    taskHeading: "1 hour exercise",
    category: "Fitness",
    points: 30,
    completed: "12 April 2024 at 10:20:00 UTC+1",
    description: "Example description",
    image: "https://hips.hearstapps.com/hmg-prod/images/running-is-one-of-the-best-ways-to-stay-fit-royalty-free-image-1036780592-1553033495.jpg?resize=1000:*"
  }
]
