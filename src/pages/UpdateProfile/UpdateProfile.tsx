import Button from "../../components/Button/Button";
import "./UpdateProfile.scss";
import { UserProfile } from "../../types/User";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
// import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type UpdateProfileProps = {
  currentUser: UserProfile;
  setCurrentUser: (updatedUser: UserProfile) => void;
};
const UpdateProfile = ({ currentUser }: UpdateProfileProps) => {
  const [user, setUser] = useState<UserProfile>(currentUser);
  const [password, setPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { img, name, bio, email } = user;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.id;
    const value = event.currentTarget.value;
    setUser({ ...user, [key]: value });
  };

  const handleCurrentPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.currentTarget.value;
    setCurrentPassword(newPassword);
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

  const changePassword = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match. Try again.");
      }
      const userPromise = await signInWithEmailAndPassword(
        auth,
        "divya@test.com",
        currentPassword
      );
      await updatePassword(userPromise.user, password);
      setErrorMessage("");
      setSuccessMessage("Password successfully changed");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
    handleClose();
    setPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  return (
    <div>
      <Header subtitle="Profile" />
      <div className="profile-update">
        <img src={img} className="profile-update__img" alt="Profile" />
        <form className="profile-update__info">
          <label htmlFor="name" className="profile-update__label">
            Name
          </label>
          <TextField
            id="name"
            value={name}
            variant="outlined"
            onChange={handleChange}
            autoComplete="none"
            className="profile-update__input"
          />
          <label htmlFor="bio" className="profile-update__label">
            Bio
          </label>
          <TextField
            id="bio"
            value={bio}
            multiline
            onChange={handleChange}
            maxRows={4}
            className="profile-update__input"
          />
          <label htmlFor="email" className="profile-update__label">
            Email
          </label>
          <TextField
            id="email"
            autoComplete="none"
            value={email}
            variant="outlined"
            disabled
            className="profile-update__input"
          />
        </form>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="profile-update__popup-heading">
            Change Password
          </DialogTitle>
          <DialogContent>
            <form className="profile-update__popup-form">
              <label
                htmlFor="current-password"
                className="profile-update__label"
              >
                Current Password
              </label>
              <TextField
                id="current-password"
                value={currentPassword}
                variant="outlined"
                onChange={handleCurrentPassword}
                type="password"
                className="profile-update__input"
              />
              <label htmlFor="password" className="profile-update__label">
                New Password
              </label>
              <TextField
                id="password"
                value={password}
                variant="outlined"
                onChange={handlePassword}
                type="password"
                className="profile-update__input"
              />
              <label
                htmlFor="confirmPassword"
                className="profile-update__label"
              >
                Confirm Password
              </label>
              <TextField
                id="confirmPassword"
                value={confirmPassword}
                variant="outlined"
                type="password"
                onChange={handleConfirmPassword}
                className="profile-update__input"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              label={"UPDATE PASSWORD"}
              variant={"light-grey"}
              onClick={changePassword}
            />
          </DialogActions>
        </Dialog>

        {errorMessage && (
          <p className="profile-update__error-message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="profile-update__success-message">{successMessage}</p>
        )}
        <Button
          label={"CHANGE PASSWORD"}
          variant={"light-grey"}
          onClick={handleClickOpen}
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
