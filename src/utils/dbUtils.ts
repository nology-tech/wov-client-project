import { db } from "../firebase";
import { doc, collection, getDocs, query, getDoc } from "firebase/firestore";

/**
 * Retrieves a document from a Firestore collection.
 *
 * @template T - The type of data expected to be retrieved.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} userId - The ID of the document to retrieve.
 * @returns {Promise<T | null>} - A promise that resolves with the retrieved document data or null if the document does not exist.
 */
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

/**
 * Retrieves a collection of documents from a Firestore collection.
 *
 * @template T - The type of data expected to be retrieved.
 * @param {string} collectionName - The name of the Firestore collection.
 * @returns {Promise<T[] | null>} - A promise that resolves with an array of retrieved documents or null if the collection is empty.
 */
export const getCollectionFromFirestore = async <T>(collectionName: string) => {
  const collectionQuery = query(collection(db, collectionName));

  const collectionResult = await getDocs(collectionQuery);

  if (collectionResult.empty) {
    return null;
  }

  const data: T[] = collectionResult.docs.map((doc) => doc.data() as T);

  return data;
};
