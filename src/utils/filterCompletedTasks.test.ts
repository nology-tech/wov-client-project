import filterCompletedTasks from "./filterCompletedTasks";
import { CompletedTask } from "../tempname/mockCompletedTasks";

const completedTasksTestData: CompletedTask[] = [
  {
    id: "1",
    taskHeading: "5am wake up",
    category: "Routine",
    points: 5,
    description: "Yawn",
    image:
      "https://cdn11.bigcommerce.com/s-zllqv0a9td/product_images/uploaded_images/adobestock-136439169-min.jpeg",
    completed: "11 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "2",
    taskHeading: "Cold shower",
    category: "Routine",
    points: 2,
    description: "Freeze",
    image:
      "https://www.statnews.com/wp-content/uploads/2015/12/ICE_AP-645x645.jpg",
    completed: "11 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "3",
    taskHeading: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    description: "Ommmm",
    completed: "11 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "4",
    taskHeading: "1 hour exercise",
    category: "Fitness",
    points: 10,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completed: "11 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "5",
    taskHeading: "Follow your diet",
    category: "Diet",
    points: 5,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completed: "10 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "6",
    taskHeading: "5k Run",
    category: "Exercise",
    points: 10,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completed: "9 April 2024 at 05:20:00 UTC+1",
  },
  {
    id: "7",
    taskHeading: "1 hour walk",
    category: "Exercise",
    points: 10,
    description: "Run as fast as you can",
    image:
      "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completed: "8 April 2024 at 05:20:00 UTC+1",
  },
];

describe("Filter completed tasks function", () => {
  it("should filter the tasks for the date given", () => {
    const filteredData11 = filterCompletedTasks(
      completedTasksTestData,
      new Date(2024, 3, 11)
    );
    const filteredData10 = filterCompletedTasks(
      completedTasksTestData,
      new Date(2024, 3, 10)
    );
    const filteredData9 = filterCompletedTasks(
      completedTasksTestData,
      new Date(2024, 3, 9)
    );
    const filteredData8 = filterCompletedTasks(
      completedTasksTestData,
      new Date(2024, 3, 8)
    );

    expect(filteredData11.length).toBe(4);
    expect(filteredData10.length).toBe(1);
    expect(filteredData9.length).toBe(1);
    expect(filteredData8.length).toBe(1);
  });

  it("shouldn't modify the original array", () => {
    const originalData = [...completedTasksTestData];
    filterCompletedTasks(completedTasksTestData, new Date(2024, 3, 11));

    expect(completedTasksTestData).toEqual(originalData);
  });

  it("should return an empty array when an empty array is given", () => {
    const filteredData = filterCompletedTasks([], new Date(2024, 3, 11));

    expect(filteredData).toEqual([]);
  });
});
