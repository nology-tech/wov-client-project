export type CreateDocumentResult = {
  error: string | null;
  created: boolean;
};

export type GroupData = {
  name: string;
  startDate: string;
  image: string;
  numberOfMembers: number;
  totalPoints: number;
};
