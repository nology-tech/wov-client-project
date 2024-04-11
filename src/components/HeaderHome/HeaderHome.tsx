import "./HeaderHome.scss";

type HeaderHomeProps = {
  image: string;
  date: string;
  location: string;
}

const HeaderHome = ({image, date, location }: HeaderHomeProps) => {
  return (
    <div className="header-home">
      <p className="header-home__info">{date}</p>
      <p className="header-home__info">{location}</p>
      <div className="header-home__div">
      <img className="header-home__div header-home__div--img" src={image} />
      </div>
    </div>
  )
}


export default HeaderHome;