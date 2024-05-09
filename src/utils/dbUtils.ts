import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  WithFieldValue,
  DocumentData,
  updateDoc,
} from "firebase/firestore";

export enum FirestoreCollections {
  TASKS = "test-tasks",
  ACTIVE_TASKS = "test-active-tasks",
  COMPLETED_TASKS = "test-completed-tasks",
  ADMIN = "admin",
  TRIBELIST = "tribes",
  USERS = "users",
}

/**
 * Retrieves a document from a Firestore collection.
 *
 * @template T - The type of data expected to be retrieved.
 * @param {FirestoreCollections} collectionName - The name of the Firestore collection.
 * @param {string} userId - The ID of the document to retrieve.
 * @returns {Promise<T | null>} - A promise that resolves with the retrieved document data or null if the document does not exist.
 */
export const getDocumentFromFirestoreCollection = async <T>(
  collectionName: FirestoreCollections,
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
 * @param {FirestoreCollections} collectionName - The name of the Firestore collection.
 * @returns {Promise<T[] | null>} - A promise that resolves with an array of retrieved documents or null if the collection is empty.
 */
export const getCollectionFromFirestore = async <T>(
  collectionName: FirestoreCollections
) => {
  const collectionQuery = query(collection(db, collectionName));

  const collectionResult = await getDocs(collectionQuery);

  if (collectionResult.empty) {
    return null;
  }

  const data: T[] = collectionResult.docs.map((doc) => doc.data() as T);

  return data;
};

type CreateDocumentResult = {
  error: string | null;
  created: boolean;
};

/**
 * Creates a document in a specified Firestore collection.
 * @template T - The type of data to be stored in the document.
 * @param {FirestoreCollections} collectionName - The name of the Firestore collection.
 * @param {string} userId - The user ID associated with the document.
 * @param {T} data - The data to be stored in the document.
 * @returns {Promise<CreateDocumentResult>} A promise that resolves with an object indicating success or failure of document creation.
 */
export const createDocumentInFirestoreCollection = async <
  T extends WithFieldValue<DocumentData>
>(
  collectionName: FirestoreCollections,
  userId: string,
  data: T
): Promise<CreateDocumentResult> => {
  try {
    await setDoc(doc(db, collectionName, userId), data);
    return { error: null, created: true };
  } catch (error) {
    return { error: (error as Error).message, created: false };
  }
};

type UpdateDocumentResult = {
  error: string | null;
  updated: boolean;
};

/**
 * Updates a document in a Firestore collection.
 * @template T - The type of the document data being updated.
 * @param {FirestoreCollections} collection - The name of the Firestore collection.
 * @param {string} userId - The ID of the user owning the document.
 * @param {T} data - The new data to update the document with.
 * @returns {Promise<UpdateDocumentResult>} A promise that resolves with an object indicating whether the update was successful and any error that occurred.
 */
export const updateDocumentInFirestoreCollection = async <
  T extends WithFieldValue<DocumentData>
>(
  collection: FirestoreCollections,
  userId: string,
  data: T
): Promise<UpdateDocumentResult> => {
  try {
    await updateDoc(doc(db, collection, userId), data);
    return { updated: true, error: null };
  } catch (error) {
    return { error: (error as Error).message, updated: false };
  }
};

// FIREBASE STORAGE

type UploadFileResult = {
  error: string | null;
  fileDownloadUrl: string | null;
};

/**
 * Uploads a file to a specified storage path and retrieves its download URL.
 * @param {string} path - The path in the storage where the file will be saved.
 * @param {File} file - The file to be uploaded.
 * @param {boolean} [useFileName=true] - Whether to use the file name as part of the storage path. Default is true.
 * @returns {Promise<UploadFileResult>} A promise that resolves with the download URL of the uploaded file or an error.
 */
export const saveFileAndRetrieveDownloadUrl = async (
  path: string,
  file: File,
  useFileName = true
): Promise<UploadFileResult> => {
  try {
    const filePathName = useFileName ? `${path}/${file.name}` : path;
    const fileRef = ref(storage, filePathName);
    const fileUpload = await uploadBytes(fileRef, file);
    const fileDownloadUrl = await getDownloadURL(fileUpload.ref);
    return { fileDownloadUrl, error: null };
  } catch (error) {
    return { error: (error as Error).message, fileDownloadUrl: null };
  }
};
