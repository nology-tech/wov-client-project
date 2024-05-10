import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import { useAuth } from "../../hooks/useAuth";
import "./ProfileAdmin.scss";
import defaultImg from "../../assets/images/default-profile-image.png"

const ProfileAdmin = () => {
  const { logoutUser, getAdmin } = useAuth();
  const { email } = getAdmin();

  return (
    <div>
      <Header subtitle="profile" profileImage="" />
      <div className="profile">
        <img src={defaultImg} className="profile__img" alt="Profile" />
        <section className="profile__info">
          <p>
            <span className="profile__label">Email</span> : {email}
          </p>
          <p>
            <span className="profile__label">Password</span> : {"*********"}
          </p>
        </section>
        <section className="profile__buttons">
          <Button
            label={"SIGN OUT"}
            variant={"secondary"}
            onClick={logoutUser}
          />
        </section>
        <NavigationAdmin navActionIndex={-1} />
      </div>
    </div>
  );
};

export default ProfileAdmin;
