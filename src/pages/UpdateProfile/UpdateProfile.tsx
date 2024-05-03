import Button from "../../components/Button/Button";
import "./UpdateProfile.scss";
import { UserProfile } from "../../types/User";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { saveFileAndRetrieveDownloadUrl } from "../../utils/dbUtils";
import { useNavigate } from "react-router-dom";

type UpdatePasswordForm = {
  current: string;
  new: string;
  confirm: string;
};

const defaultUpdatePasswordForm = {
  current: "",
  new: "",
  confirm: "",
};

const UpdateProfile = () => {
  const { getUser, updateUser } = useAuth();
  const user = getUser();
  const [userUpdate, setUserUpdate] = useState<UserProfile>(user);
  const [password, setPassword] = useState<UpdatePasswordForm>(
    defaultUpdatePasswordForm
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openPasswordPopup, setOpenPasswordPopup] = useState<boolean>(false);
  const { img, name, bio, email } = userUpdate;
  const [showUploadPrompt, setShowUploadPrompt] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleClickOpenPasswordPopup = () => {
    setOpenPasswordPopup(true);
  };

  const handleClosePasswordPopup = () => {
    setOpenPasswordPopup(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.id;
    console.log("key:", key);
    const value = event.currentTarget.value;
    console.log("value:", value);
    setUserUpdate({ ...userUpdate, [key]: value });
  };

  console.log("userUpdate:", userUpdate);

  const handlePaswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.id;
    const value = event.currentTarget.value;
    setPassword({ ...password, [key]: value });
  };

  const updateDatabase = async () => {
    let img: string | undefined = user.img
  
  
    if (selectedFile) {
      const filePath = `${user.id}/images/profile`;
      const { fileDownloadUrl, error: uploadError } =
        await saveFileAndRetrieveDownloadUrl(filePath, selectedFile, false);
  
      if (uploadError) {
        throw new Error(uploadError);
      }
  
      img = fileDownloadUrl || img || undefined; 
    }
    const { error } = await updateUser({ name, bio, email, img });
    console.log("errorUser:", error)
    
    console.log("did we get here!")

    if (error) {
      setErrorMessage(error);
      setSuccessMessage("");
      console.error("error occurred:", error)
    } else {
      setErrorMessage("");
      setSuccessMessage("Profile Updated");
    }
  
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };
  
  

  const changePassword = async () => {
    if (password.new !== password.confirm) {
      setErrorMessage("Passwords do not match. Try again.");
    } else {
      try {
        const userPromise = await signInWithEmailAndPassword(
          auth,
          user.email,
          password.current
        );
        await updatePassword(userPromise.user, password.new);
        setErrorMessage("");
        setSuccessMessage("Password successfully changed");
      } catch (error) {
        setErrorMessage((error as Error).message);
        setSuccessMessage("");
      }
    }
    handleClosePasswordPopup();
    setPassword({ current: "", new: "", confirm: "" });
  };

  const handleShowUploadPrompt = () => {
    setShowUploadPrompt(!showUploadPrompt);
  };

  const handlePictureChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      setSelectedFile(file);
    }
  };

  console.log("file:", selectedFile)

  return (
    <div>
      <Header subtitle="Profile" profileImage={img} />
      <div className="profile-update">
      <input
        id="img"
        name="img"
        className=""
        type="file"
        onChange={handlePictureChange}
        style={{ display: "none" }}
      />
      {/* Label associated with the input element */}
      <label htmlFor="img">
        <img
          src={img}
          className="profile-update__img"
          alt="Profile"
          style={{ cursor: 'pointer' }}
        />
      </label>

      


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

        <Dialog
          open={openPasswordPopup}
          onClose={handleClosePasswordPopup}
          className="profile-update__popup"
        >
          <DialogContent>
            <p className="profile-update__popup-heading">UPDATE PASSWORD</p>
            <form className="profile-update__popup-form">
              <label htmlFor="current" className="profile-update__label">
                Current Password
              </label>
              <TextField
                id="current"
                value={password.current}
                variant="outlined"
                onChange={handlePaswordChange}
                type="password"
                className="profile-update__input"
              />
              <label htmlFor="new" className="profile-update__label">
                New Password
              </label>
              <TextField
                id="new"
                value={password.new}
                variant="outlined"
                onChange={handlePaswordChange}
                type="password"
                className="profile-update__input"
              />
              <label htmlFor="confirm" className="profile-update__label">
                Confirm Password
              </label>
              <TextField
                id="confirm"
                value={password.confirm}
                variant="outlined"
                type="password"
                onChange={handlePaswordChange}
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

        {showUploadPrompt ? (
          <>
            <input
              id="img"
              name="img"
              className=""
              type="file"
              onChange={handlePictureChange}
            />
            {selectedFile && <span>{selectedFile.name}</span>}
          </>
        ) : (
          <Button
            label={"CHANGE PICTURE"}
            variant={"light-grey"}
            onClick={handleShowUploadPrompt}
          />
        )}

        {selectedFile && (
          <p className="register__error-message--file-name">
            {selectedFile.name}
          </p>
        )}
        <Button
          label={"CHANGE PASSWORD"}
          variant={"light-grey"}
          onClick={handleClickOpenPasswordPopup}
        />
        <Button
          label={"UPDATE PROFILE"}
          variant={"light-grey"}
          onClick={updateDatabase}
        />
      </div>
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default UpdateProfile;
