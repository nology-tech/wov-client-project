import { randomUserProfiles as users } from "./mockData";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import "./Profile.scss";
const mockUser = users[0];
const Profile = () => {
  return (
    //Header

    //Profile
    //-------------------------------------------------------------
    <div className="profile">
      <img src={mockUser.img} className="profile__img" />
      <h1 className="profile__score">{mockUser.score}</h1>
      <section className="profile__info">
        <p>
          <strong>Bio</strong> : {mockUser.name}{" "}
        </p>
        <p>
          <strong>Email</strong> : {mockUser.email}{" "}
        </p>
        <p>
          <strong>Password</strong> : {mockUser.password}{" "}
        </p>
      </section>

      <Button
        label={"EDIT PROFILE"}
        variant={"light-grey"}
        onClick={() => console.log("edit")}
      ></Button>
      <Button
        label={"SIGN OUT"}
        variant={"secondary"}
        onClick={() => console.log("Sign out ")}
      ></Button>
      <Navigation navActionIndex={0} />
    </div>
    //Nav
  );
};
export default Profile;
