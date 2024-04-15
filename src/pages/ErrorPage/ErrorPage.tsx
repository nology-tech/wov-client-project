import "./ErrorPage.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ErrorSVG from "../../components/ErrorSVG/ErrorSVG";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__heading-first">
        OOPS.
        <br />
        LOOKS LIKE YOU'VE TAKEN A WRONG TURN.
      </h1>
      <ErrorSVG />
      <Link to="/">
        <div className="error-page__button">
          <Button label={"Home"}></Button>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
