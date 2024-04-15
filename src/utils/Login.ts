import { getAuth, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);
signInWithEmailAndPassword(auth, "test@example.com" , "123456")
// signInWithCustomToken(auth, "qDjHyzko7ehZKSOSHe0uHJ0KEjR2")
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
})
