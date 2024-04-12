import "./Header.scss";
import { Link } from "react-router-dom";
import fallbackProfile from "../../../public/assets/images/default-profile-image.png";

type HeaderProps = {
  subtitle?: string;
  profileImage?: string;
};

const Header = ({ subtitle, profileImage }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__image-div">
        <Link to="/profile">
          <img
            className="header__image-div header__image-div--image"
<<<<<<<<< Temporary merge branch 1
            src={profileImage ?? "./assets/images/default-profile-image.png"}
=========
            src={profileImage ?? fallbackProfile}
>>>>>>>>> Temporary merge branch 2
          />
        </Link>
      </div>
      <div className="header__title-div">
        <h4 className="header__title-div header__title-div--title">
          WAY OF THE VIKING
        </h4>
        <h1 className="header__title-div header__title-div--subtitle">
          {subtitle}
        </h1>
      </div>
    </header>
  );
};

export default Header;
