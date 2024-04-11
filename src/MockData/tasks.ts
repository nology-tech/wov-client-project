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
  {
    requirement: "Grow a beard",
    category: "Viking",
    points: 50,
    id: 8,
  },
  {
    requirement: "Use a sword",
    category: "Viking",
    points: 50,
    id: 9,
  },
  {
    requirement: "Pilther a village",
    category: "Viking",
    points: 70,
    id: 10,
  },
  {
    requirement: "Conquer a land",
    category: "Viking",
    points: 100,
    id: 11,
  },
];

export default tasks;