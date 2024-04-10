export type Tasks = {
    requirement: string,
    category: string,
    points: number,
}

const tasks: Tasks[] =[
    {
        requirement: "5am wake up",
        category: "Routine",
        points: 5,
    },
    {
    requirement: "Cold shower",
    category: "Routine",
    points: 2,
    },
    {
    requirement: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    },
    {
    requirement: "1 hour exercise",
    category: "Fitness",
    points: 10,
    },
    {
    requirement: "Follow your diet",
    category: "Diet",
    points: 5,
    },
    {
    requirement: "5k Run",
    category: "Exercise",
    points: 10,
    },
    {
    requirement: "1 hour walk",
    category: "Exercise",
    points: 10,
    },
    {
    requirement: "Grow a beard",
    category: "Viking",
    points: 50,
    },
    {
    requirement: "Use a sword",
    category: "Viking",
    points: 50,
    },
    {
    requirement: "Pilther a village",
    category: "Viking",
    points: 70,
    },
    {
    requirement: "Conquer a land",
    category: "Viking",
    points: 100,
    },
];

export default tasks;