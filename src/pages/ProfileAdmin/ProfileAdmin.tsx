import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import NavigationAdmin from "../../components/NavigationAdmin/NavigationAdmin";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./ProfileAdmin.scss";

const ProfileAdmin = () => {
  const navigate = useNavigate();
  const { logoutUser, getAdmin } = useAuth();
  const { email, id } = getAdmin();

  return (
    <div>
      <Header subtitle="profile" profileImage="" />
      <div className="profile">
        <img src="image" className="profile__img" alt="Profile" />

        <section className="profile__info">
          <p>
            <span className="profile__label">Name</span> : {id}
          </p>
          <p>
            <span className="profile__label">Bio</span> :
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
        <NavigationAdmin navActionIndex={-1} />
      </div>
    </div>
  );
};

export default ProfileAdmin;
