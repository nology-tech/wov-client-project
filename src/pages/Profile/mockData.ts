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
    name: "John Doe",
    bio: "lean,mean,fighting machine",
    email: "john.doe@example.com",
    password: "password1",
  },
  {
    id: 2,
    img: "https://picsum.photos/200/300",
    score: 450,
    name: "Todd Griffin",
    bio: "bold,brave,adventurous spirit",
    email: "todd.griffin@example.com",
    password: "password2",
  },
  {
    id: 3,
    img: "https://picsum.photos/200/300",
    score: 200,
    name: "Hamish Lawson",
    bio: "fierce,driven,never backs down",
    email: "hamish.lawson@example.com",
    password: "password3",
  },
  {
    id: 4,
    img: "https://picsum.photos/200/300",
    score: 600,
    name: "Samuel Raducan",
    bio: "determined,tenacious,always striving",
    email: "samuel.raducan@example.com",
    password: "password4",
  },
  {
    id: 5,
    img: "https://picsum.photos/200/300",
    score: 350,
    name: "Baheer Wardak",
    bio: "vigilant,resilient,unstoppable force",
    email: "baheer.wardak@example.com",
    password: "password5",
  },
];
