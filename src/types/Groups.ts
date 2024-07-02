export type CreateDocumentResult = {
  error: string | null;
  created: boolean;
};

export type GroupData = {
  id: string;
  name: string;
  startDate: string;
  image: string;
  numberOfMembers: number;
  totalPoints: number;
  users: string[]
};
