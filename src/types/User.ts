export type UserProfile = {
  id: string;
  img?: string;
  totalScore: number;
  name: string;
  bio?: string;
  email: string;
  tribe: string;
  loginCount?: number;
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

export type AdminProfile = {
  email: string;
  id: string;
  reference: string;
};

export type AdminLoading = AdminProfile;

export type UserLoading = UserProfile & { loading: true };

export type User = {
  image: string;
  name: string ;
  points: number
  tribe: string;
  memberSince: number;
}
