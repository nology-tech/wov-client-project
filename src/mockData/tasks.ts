export type Tasks = {
    requirement: string,
    category: string,
    points: number,
    id: number,
}

const tasks: Tasks[] = [
  {
    requirement: "5am wake up",
    category: "Routine",
    points: 5,
    id: 1,
  },
  {
    requirement: "Cold shower",
    category: "Routine",
    points: 2,
    id: 2,
  },
  {
    requirement: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    id: 3,
  },
  {
    requirement: "1 hour exercise",
    category: "Fitness",
    points: 10,
    id: 4,
  },
  {
    requirement: "Follow your diet",
    category: "Diet",
    points: 5,
    id: 5,
  },
  {
    requirement: "5k Run",
    category: "Exercise",
    points: 10,
    id: 6,
  },
  {
    requirement: "1 hour walk",
    category: "Exercise",
    points: 10,
    id: 7,
  },
];

export default tasks;