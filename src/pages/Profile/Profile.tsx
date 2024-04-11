import Button from "../../components/Button/Button";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { UserProfile } from "./mockData";

type ProfileProps = {
  user: UserProfile;
};

const Profile = ({ user }: ProfileProps) => {
  const starredPassword = "*".repeat(user.password.length);
  return (
    <div className="profile">
      <img src={user.img} className="profile__img" />
      <h1 className="profile__score">{user.score}</h1>
      <section className="profile__info">
        <p>
          <strong>Name</strong> : {user.name}{" "}
        </p>
        <p>
          <strong>Bio</strong> : {user.bio}{" "}
        </p>
        <p>
          <strong>Email</strong> : {user.email}{" "}
        </p>
        <p>
          <strong>Password</strong> : {starredPassword}{" "}
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
