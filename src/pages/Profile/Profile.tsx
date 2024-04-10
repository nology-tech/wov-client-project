import { randomUserProfiles as users } from "./mockData";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import "./Profile.scss";
const mockUser = users[0];
let starredPassword = "";

for (let char of mockUser.password) {
  starredPassword += "*";
}

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
      </section>
      <Navigation navActionIndex={4} />
    </div>
  );
};
export default Profile;
