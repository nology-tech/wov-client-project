import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { capitalisedFirstLetters } from "../../utils/capitalisedFirstLetters";
import { auth } from "../../firebase";

import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/images/arrow-left.png";
import Button from "../../components/Button/Button";
import { doc, setDoc } from "firebase/firestore";
import "./Register.scss";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const emptyFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  bio: "",
  img: "",
  tribe: "",
};

type RegisterProps = {
  setUserUID: (userID: string) => void;
};

const Register = ({ setUserUID }: RegisterProps) => {
  const [formData, setFormData] = useState(emptyFormData);
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [showSecondForm, setShowSecondFrom] = useState<boolean>(false);
  //const [selectedTribe, setSelectedTribe] = useState<string>("");
  const [showUploadPrompt, setShowUploadPrompt] = useState<boolean>(false);
  const [recentUploadImg, setRecentUploadImg] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formData.firstName && formData.lastName) {
      setShowSecondFrom(true);
    }
  };

  const handlePrevious = () => {
    showSecondForm ? setShowSecondFrom(false) : navigate(-1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match. Try again.");
      }
      setPasswordMatchError("");

      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      const uid = userCredential.user.uid;
      setUserUID(uid);
      await addUserData(uid);
    } catch (error) {
      setFormData(emptyFormData);
      setPasswordMatchError((error as Error).message);
    }
    console.log(formData);

    try {
      const docRef = await addDoc(collection(db, "test-tribe"), {
        Name: formData.firstName + formData.lastName,
        email: formData.email,
        bio: formData.bio,
        img: formData.img,
        tribe: formData.tribe,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document", e);
    }

    const form = event.currentTarget;
    console.log(form);

    const input = form["img"] as HTMLInputElement;
    if (!input.files) {
      alert("No files found :S");
      return;
    }

    const file = input.files[0];
    const fileRef = ref(storage, `${formData.firstName}/${file.name}`);
    const fileUpload = await uploadBytes(fileRef, file);

    const fileDownloadURL = await getDownloadURL(fileUpload.ref);
    setRecentUploadImg(fileDownloadURL);
  };

  const handleTribeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowUploadPrompt = () => {
    setShowUploadPrompt(!showUploadPrompt);
  };

  const addUserData = async (uid: string) => {
    try {
      await setDoc(doc(db, "test-tribe", uid), {
        id: uid,
        img: "",
        totalScore: 0,
        name:
          capitalisedFirstLetters(formData.firstName) +
          " " +
          capitalisedFirstLetters(formData.lastName),
        bio: "",
        email: formData.email,
      });
      await setDoc(doc(db, "test-completed-tasks", uid), {
        completedTasks: [],
      });
      await setDoc(doc(db, "test-active-tasks", uid), {
        activeTasks: [],
      });
    } catch (error) {
      console.log("Error adding user data to Firestore:", error);
    }
  };

  return (
    <section className="register">
      <div className="register__icon--container">
        <img
          onClick={handlePrevious}
          className="register__icon--arrow"
          src={arrowLeft}
          alt="Arrow Left Icon"
        />
      </div>
      <h2 className="register__heading">Create An Account</h2>

      {!showSecondForm ? (
        <form onSubmit={handleSubmit} className="register__form" action="#">
          <label className="register__label" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            className="register__input"
            type="text"
            placeholder="John"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            className="register__input"
            type="text"
            placeholder="Smith"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="bio">
            Bio
          </label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            className="register__input "
            type="text"
            placeholder="Bio"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="bio">
            Tribe
          </label>
          <select
            id="tribe"
            name="tribe"
            value={formData.tribe}
            className="register__input register__input--margin-bottom"
            onChange={handleTribeChange}
          >
            <option value="test-tribe">test-tribe</option>
            <option value="Tribe2">Tribe2</option>
          </select>
          <label className="register__label" htmlFor="img"></label>
          {showUploadPrompt ? (
            <input
              id="img"
              name="img"
              value={formData.img}
              className="register__input register__input--img-upload"
              type="file"
              onChange={handleChange}
            />
          ) : (
            <Button
              label="ADD PROFILE IMAGE"
              variant="light-grey"
              onClick={handleShowUploadPrompt}
            />
          )}

          <Button label="Next" variant="light-grey" onClick={handleNext} />
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="register__form" action="#">
          <label className="register__label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            className="register__input"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            className="register__input"
            type="password"
            placeholder="Your password"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            className="register__input with-margin-bottom"
            type="password"
            onChange={handleChange}
          />
          {passwordMatchError && (
            <p className="register__error-message">{passwordMatchError}</p>
          )}
          {/* WHEN REGISTERING IS SUCCESSFUL -> LINK TO SIGN PAGE */}
          {/* ALSO, SHOW A MESSAGE TO THE USER WITH CONGRATULATIONS FOR CREATING AN ACCOUNT */}
          <Button label="SIGN UP" />
        </form>
      )}
    </section>
  );
};

export default Register;
