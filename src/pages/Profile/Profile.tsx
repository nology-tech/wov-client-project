import Button from "../../components/Button/Button";
import "./Profile.scss";
import { Link, Navigate } from "react-router-dom";
import { UserProfile } from "../../Mockdata/mockTribe";;
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }: { user: UserProfile }) => {
  const { totalScore, img, name, bio, email } = user;
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
   
      .then(() => {
        navigate ("/auth");
      })
  // .catch((error) => {
  //     // An error occurred during log out
  //     console.error("Error logging out:", error);
  // });
};

  return (
    <div>
      <Header subtitle="Profile" />
      <div className="profile">
        <img src={img} className="profile__img" alt="Profile" />
        <h1 className="profile__score">{totalScore}</h1>
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
            onClick={() => handleSignOut()}
          />
        </section>
      </div>
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default Profile;







