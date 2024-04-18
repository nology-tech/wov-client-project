import { db } from "../firebase";
import { doc, collection, getDocs, query, getDoc } from "firebase/firestore";

export const getDocumentFromFirestoreCollection = async <T>(
  collectionName: string,
  userId: string
) => {
  const retrievalReference = doc(db, collectionName, userId);

  const retrieveTasks = await getDoc(retrievalReference);

  if (!retrieveTasks.exists()) {
    return null;
  }

  const data = retrieveTasks.data() as T;

  return data;
};

export const getCollectionFromFirestore = async <T>(collectionName: string) => {
  const collectionQuery = query(collection(db, collectionName));

  const collectionResult = await getDocs(collectionQuery);

  if (collectionResult.empty) {
    return null;
  }

  const data: T[] = collectionResult.docs.map((doc) => doc.data() as T);

  return data;
};
