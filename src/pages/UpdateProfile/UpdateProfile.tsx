import Button from "../../components/Button/Button";
import "./UpdateProfile.scss";
import { UserProfile } from "../../mockData/mockTribe";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
// import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  User,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

const UpdateProfile = ({ currentUser }: { currentUser: UserProfile }) => {
  const [user, setUser] = useState<UserProfile>(currentUser);
  const [password, setPassword] = useState<string>("123456");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("123456");
  const { img, name, bio, email } = user;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.id;
    const value = event.currentTarget.value;
    setUser({ ...user, [key]: value });
  };
  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.currentTarget.value;
    setPassword(newPassword);
  };
  const handleConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.currentTarget.value;
    setConfirmPassword(newPassword);
  };
  const updateDatabase = async () => {
    try {
      await updateDoc(doc(db, "test-tribe", "OuZ1eeH9c5ZosgoXUi6Iraq7oM03"), {
        name: name,
        bio: bio,
        email: email,
      });
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const changePassword = () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Try again.");
      }
      signInWithEmailAndPassword(auth, "divya@test.com", "123456")
        .then(async () => {
          console.log("Sign In SuccessFul!");
          await updatePassword(auth.currentUser as User, password)
            .then(() => {
              console.log("password changed");
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        })
        .catch((error) => {
          throw new Error(error.message);
        });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div>
      <Header subtitle="Profile" />
      <div className="profile">
        <img src={img} className="profile__img" alt="Profile" />
        <form className="profile__info">
          <label htmlFor="name" className="profile__label">
            Name
          </label>
          <TextField
            id="name"
            value={name}
            variant="outlined"
            onChange={handleChange}
            autoComplete="none"
          />
          <label htmlFor="bio" className="profile__label">
            Bio
          </label>
          <TextField
            id="bio"
            value={bio}
            multiline
            onChange={handleChange}
            maxRows={4}
          />
          <label htmlFor="email" className="profile__label">
            Email
          </label>
          <TextField
            id="email"
            autoComplete="none"
            value={email}
            variant="outlined"
            disabled
          />
          <label htmlFor="password" className="profile__label">
            Password
          </label>
          <TextField
            id="password"
            value={password}
            variant="outlined"
            onChange={handlePassword}
            type="password"
          />
          <label htmlFor="confirmPassword" className="profile__label">
            Confirm Password
          </label>
          <TextField
            id="confirmPassword"
            value={confirmPassword}
            variant="outlined"
            type="password"
            onChange={handleConfirmPassword}
          />
        </form>
        {errorMessage && (
          <p className="register__error-message">{errorMessage}</p>
        )}
        <Button
          label={"CHANGE PASSWORD"}
          variant={"light-grey"}
          onClick={changePassword}
        />
        {/* <Link to="/profile"> */}
        <Button
          label={"UPDATE PROFILE"}
          variant={"light-grey"}
          onClick={updateDatabase}
        />
        {/* </Link> */}
      </div>
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default UpdateProfile;
