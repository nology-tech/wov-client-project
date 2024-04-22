export type UserProfile = {
  id: string;
  img?: string;
  totalScore: number;
  name: string;
  bio?: string;
  email: string;
  tribe: string;
};

export type NewUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio: string;
  img: string;
  tribe: string;
};
