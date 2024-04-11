import Button from "../../components/Button/Button";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { UserProfile } from "../../utils/mockData";

const Profile = ({ id, score, img, name, bio, email }: UserProfile) => {
  const starredPassword = "*********";
  return (
    <div className="profile">
      <img src={img} className="profile__img" alt="Profile" />
      <h1 className="profile__score">{score}</h1>
      <section className="profile__info">
        <p>
          <span className="profile__label">Name</span> : {name}{" "}
        </p>
        <p>
          <span className="profile__label">Bio</span> : {bio}{" "}
        </p>
        <p>
          <span className="profile__label">Email</span> : {email}{" "}
        </p>
        <p>
          <span className="profile__label">Password</span> : {starredPassword}{" "}
        </p>
      </section>
      <section className="profile__buttons">
        <Link to="/edit">
          <Button
            label={"EDIT PROFILE"}
            variant={"light-grey"}
            onClick={() => console.log("edit")}
          />
        </Link>
        <Button
          label={"SIGN OUT"}
          variant={"secondary"}
          onClick={() => console.log("Sign out")}
        />
      </section>
    </div>
  );
};

export default Profile;
