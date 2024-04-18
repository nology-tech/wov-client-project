import "./ErrorPage.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import ErrorSVG from "../../components/ErrorSVG/ErrorSVG";
import { useAuth } from "../../hooks/useAuth";

const ErrorPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="error-page">
      <h1 className="error-page__heading">
        OOPS.
        <br />
        LOOKS LIKE YOU'VE TAKEN A WRONG TURN.
      </h1>
      <ErrorSVG />  
      <Link to={isAuthenticated ? "/" : "/auth"}>
        <div className="error-page__button">
          <Button label={"Home"}></Button>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
