import "./ErrorPage.scss";
import Button from "../../components/Button/Button";
import errorMessage from "../../../public/assets/images/error-message.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__heading-first">OOPS.</h1>
      <h1 className="error-page__heading-second">
        LOOKS LIKE YOU'VE TAKEN A WRONG TURN.
      </h1>
      <img className="error-page__image" src={errorMessage}></img>
      <Link to="/home">
        <div className="error-page__button">
          <Button label={"Home"}></Button>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
