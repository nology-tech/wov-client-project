import Button from "../../components/Button/Button";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { UserProfile } from "../../utils/mockData";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";

const Profile = ({ user }: { user: UserProfile }) => {
  const { score, img, name, bio, email } = user;

  return (
    <div>
      <Header subtitle="Profile" />
      <div className="profile">
        <img src={img} className="profile__img" alt="Profile" />
        <h1 className="profile__score">{score}</h1>
        <section className="profile__info">
          <p>
            <span className="profile__label">Name</span> : {name}
          </p>
          <p>
            <span className="profile__label">Bio</span> : {bio}
          </p>
          <p>
            <span className="profile__label">Email</span> : {email}
          </p>
          <p>
            <span className="profile__label">Password</span> : {"*********"}
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
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default Profile;
