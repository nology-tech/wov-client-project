import "./Account.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../Provider/Provider";

const Account = () => {
  const { userUID } = useAuth()
  console.log("userUID", userUID)

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
        <Link to="/sign-in">
          <Button label="SIGN IN" variant="secondary" />
        </Link>
      </div>
    </section>
  );
};

export default Account;
