import "./Profile.scss";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import defaultImg from "../../assets/images/default-profile-image.png"

const Profile = () => {
  const navigate = useNavigate();
  const { logoutUser, getUser } = useAuth();
  const { totalScore, img, name, bio, email } = getUser();

  return (
    <div>
      <Header subtitle="Profile" profileImage={img} />
      <div className="profile">
        <img src={img ? img : defaultImg} className="profile__img" alt="Profile" />
       
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
          <Button
            label={"EDIT PROFILE"}
            variant={"light-grey"}
            onClick={() => navigate("/edit")}
          />
          <Button
            label={"SIGN OUT"}
            variant={"secondary"}
            onClick={logoutUser}
          />
        </section>
      </div>
      <Navigation navActionIndex={-1} />
    </div>
  );
};

export default Profile;
