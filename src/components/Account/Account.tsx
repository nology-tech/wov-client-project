import "./Account.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <section className="account">
      <div className="account__info">
        <h2 className="account__info--heading">
          Way Of <br /> The Viking
        </h2>
        <p className="account__info--text">CHANGE YOUR MINDSET</p>
      </div>

      <div className="account__buttons">
        <Link to="/register">
          <Button label="CREATE AN ACCOUNT" />
        </Link>
        <Button label="SIGN IN" variant="secondary" />
      </div>
    </section>
  );
};

export default Account;
