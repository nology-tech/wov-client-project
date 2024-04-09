import "./HeaderHome.scss";


const HeaderHome = () => {
  // "today" should only be used in the Home page header.
  const today = new Date(),
  date = today.getDate() + " " +  today.toLocaleString('default', { month: 'long' }) + " " +  today.getFullYear();

// const location = getCurrentPosition()
  return (
    <div className="header-home">
      <p>{date}</p> 
    </div>
  )
}


export default HeaderHome;