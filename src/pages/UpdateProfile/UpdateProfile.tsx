import Button from "../../components/Button/Button";
import "./UpdateProfile.scss";
import { UserProfile } from "../../mockData/mockTribe";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import TextField from "@mui/material/TextField";

const UpdateProfile = ({ user }: { user: UserProfile }) => {
  const { totalScore, img, name, bio, email } = user;

  return (
    <div>
      <Header subtitle="Profile" />
      <div className="profile">
        <img src={img} className="profile__img" alt="Profile" />
        <h1 className="profile__score">{totalScore}</h1>
        <form className="profile__info">
          <label className="profile__label">Name</label>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <span className="profile__label">Bio</span> : {bio}
          <span className="profile__label">Email</span> : {email}
          <span className="profile__label">Password</span> : {"*********"}
        </form>
        <section className="profile__buttons">
          <Button
            label={"SIGN OUT"}
            variant={"light-grey"}
            onClick={() => console.log("Sign out")}
          />
        </section>
      </div>
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default UpdateProfile;
