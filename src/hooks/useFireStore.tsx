import { useContext } from "react";
import {
  FirestoreContext,
  FirestoreContextProps,
} from "../context/FirestoreProvider/FirestoreProvider";

export const useFirestore = (): FirestoreContextProps => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error("useFirestore must be used within an FirestoreProvider");
  }
  return context;
};
