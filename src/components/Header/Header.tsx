import "./Header.scss"

type HeaderProps = {
    title: string;
    subtitle ?: string
    image ?: string;
}

const Header = ({title, subtitle, image}: HeaderProps) => {
    
    return(
        <header className="header">
            <div className="header__image">
                <img src={image} />
            </div>
            <h4 className="header__title">{title}</h4>
            <h1 className="header__subtitle">{subtitle}</h1>
        </header>
    )
}

export default Header;