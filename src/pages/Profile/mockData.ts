type UserProfile = {
  id: number;
  img: string;
  score: number;
  name: string;
  bio: string;
  email: string;
  password: string;
};
export const randomUserProfiles: UserProfile[] = [
  {
    id: 1,
    img: "https://picsum.photos/200/300",
    score: 300,
    name: "Athish Thayalan",
    bio: "Passionate about technology and innovation.",
    email: "athish.thayalan@example.com",
    password: "password1",
  },
  {
    id: 2,
    img: "https://picsum.photos/200/300",
    score: 450,
    name: "Todd Griffin",
    bio: "Adventure seeker with a love for coding.",
    email: "todd.griffin@example.com",
    password: "password2",
  },
  {
    id: 3,
    img: "https://picsum.photos/200/300",
    score: 200,
    name: "Hamish Lawson",
    bio: "Enthusiastic learner exploring the world of programming.",
    email: "hamish.lawson@example.com",
    password: "password3",
  },
  {
    id: 4,
    img: "https://picsum.photos/200/300",
    score: 600,
    name: "Samuel Raducan",
    bio: "Tech enthusiast and aspiring software engineer.",
    email: "samuel.raducan@example.com",
    password: "password4",
  },
  {
    id: 5,
    img: "https://picsum.photos/200/300",
    score: 350,
    name: "Baheer Wardak",
    bio: "Passionate coder and advocate for accessibility.",
    email: "baheer.wardak@example.com",
    password: "password5",
  },
];
