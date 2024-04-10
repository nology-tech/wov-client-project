import { randomUserProfiles as users } from "./mockData";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { UserProfile } from "./mockData";

const mockUser = users[0];

const starredPassword = "*".repeat(mockUser.password.length);

type ProfileProps = {
  user: UserProfile;
};

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="profile">
      <img src={mockUser.img} className="profile__img" />
      <h1 className="profile__score">{mockUser.score}</h1>
      <section className="profile__info">
        <p>
          <strong>Name</strong> : {mockUser.name}{" "}
        </p>
        <p>
          <strong>Bio</strong> : {mockUser.bio}{" "}
        </p>
        <p>
          <strong>Email</strong> : {mockUser.email}{" "}
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
          ></Button>
        </Link>
        <Button
          label={"SIGN OUT"}
          variant={"secondary"}
          onClick={() => console.log("Sign out ")}
        ></Button>
      </section>
      <Navigation navActionIndex={4} />
    </div>
  );
};
export default Profile;
