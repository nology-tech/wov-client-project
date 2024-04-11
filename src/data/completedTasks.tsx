export type Tasks = {
  Title: string;
  category: string;
  points: number;
  desc: string;
  img?: string;
  completedDate: Date;
};

const tasks: Tasks[] = [
  {
    Title: "5am wake up",
    category: "Routine",
    points: 5,
    desc: "Yawn",
    img: "https://cdn11.bigcommerce.com/s-zllqv0a9td/product_images/uploaded_images/adobestock-136439169-min.jpeg",
    completedDate: new Date(2024, 3, 11),
  },
  {
    Title: "Cold shower",
    category: "Routine",
    points: 2,
    desc: "Freeze",
    img: "https://www.statnews.com/wp-content/uploads/2015/12/ICE_AP-645x645.jpg",
    completedDate: new Date(2024, 3, 11),
  },
  {
    Title: "10 minutes meditation",
    category: "Wellness",
    points: 3,
    desc: "Ommmm",
    completedDate: new Date(2024, 3, 10),
  },
  {
    Title: "1 hour exercise",
    category: "Fitness",
    points: 10,
    desc: "Run as fast as you can",
    img: "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completedDate: new Date(2024, 3, 10),
  },
  {
    Title: "Follow your diet",
    category: "Diet",
    points: 5,
    desc: "Run as fast as you can",
    img: "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completedDate: new Date(2024, 3, 11),
  },
  {
    Title: "5k Run",
    category: "Exercise",
    points: 10,
    desc: "Run as fast as you can",
    img: "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completedDate: new Date(2024, 3, 9),
  },
  {
    Title: "1 hour walk",
    category: "Exercise",
    points: 10,
    desc: "Run as fast as you can",
    img: "https://img.freepik.com/premium-photo/running-man-silhouette-sunset-time-sport-active-life-concept_221513-1606.jpg",
    completedDate: new Date(2024, 3, 8),
  },
];

export default tasks;
