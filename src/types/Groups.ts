export type CreateDocumentResult = {
  error: string | null;
  created: boolean;
};

export type GroupData = {
  tribeName: string;
  "start-date": string;
  "end-date": string;
  image: string;
};
