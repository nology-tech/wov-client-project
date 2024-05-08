export type CreateDocumentResult = {
  error: string | null;
  created: boolean;
};

export type GroupData = {
  tribeName: string;
  startDate: string;
  numberOfMembers: number;
  totalPoints: number;
  image: string;
};
