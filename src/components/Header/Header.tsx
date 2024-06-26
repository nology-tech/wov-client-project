import "./Header.scss";
import { Link } from "react-router-dom";

type HeaderProps = {
  subtitle: string;
  profileImage?: string;
};

const Header = ({ subtitle, profileImage }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__image-div">
        <Link to="/profile">
          <img
            className="header__image-div header__image-div--image"
            src={
              profileImage
                ? profileImage
                : "../../assets/images/default-profile-image.png"
            }
            aria-label="profile picture link"
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
