import Button from "../../components/Button/Button";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { UserProfile } from "../../utils/mockData";

const Profile = ({ user }: { user: UserProfile }) => {
  const starredPassword = "*".repeat(user.password.length);
  return (
    <div className="profile">
      <img src={user.img} className="profile__img" />
      <h1 className="profile__score">{user.score}</h1>
      <section className="profile__info">
        <p>
          <span className="profile__label">Name</span> : {user.name}{" "}
        </p>
        <p>
          <span className="profile__label">Bio</span> : {user.bio}{" "}
        </p>
        <p>
          <span className="profile__label">Email</span> : {user.email}{" "}
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
