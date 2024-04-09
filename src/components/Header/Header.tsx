import "./Header.scss";
import { Link } from "react-router-dom";


type HeaderProps = {
    title: string;
    subtitle ?: string
    image ?: string;
    
}

const Header = ({title, subtitle, image}: HeaderProps) => {
    

    return (
        <header className="header">
    
            <div className="header__image-div">
                <Link to="/profile">
                <img className="header__image-div header__image-div--image" src={image} />
                </Link>
            </div>
        
            <div className="header__title-div">
                <h4 className="header__title-div header__title-div--title">{title}</h4>
                <h1 className="header__title-div header__title-div--subtitle">{subtitle}</h1>
            </div>
        </header>
    )
}

export default Header;