import "./Register.scss";
import Button from "../Button/Button";
import arrowLeft from "../../assets/images/arrow-left.png";
import { Link } from "react-router-dom";

const Register = () => {
  //   const [userDetails, setUserDetails] = useState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  return (
    <section className="register">
      <Link to={"#"}>
        <img
          className="register__icon-arrow"
          src={arrowLeft}
          alt="Arrow Left Icon"
        />
      </Link>
      <h2 className="register__heading">Create An Account</h2>

      <form className="register__form" action="#">
        <label className="register__form--label" htmlFor="">
          First Name
        </label>
        <input
          className="register__form--input"
          type="text"
          placeholder="John"
        />
        <label className="register__form--label" htmlFor="">
          Last Name
        </label>
        <input
          className="register__form--input with-margin-bottom"
          type="text"
          placeholder="Smith"
        />
        <Button label="Next" />
      </form>

      {/* <form className="register__form" action="#">
        <label className="register__form--label" htmlFor="">
          Email Address
        </label>
        <input
          className="register__form--input"
          type="email"
          placeholder="you@example.com"
        />
        <label className="register__form--label" htmlFor="">
          Password
        </label>
        <input
          className="register__form--input"
          type="password"
          placeholder="Your password"
        />
        <label className="register__form--label" htmlFor="">
          Confirm Password
        </label>
        <input className="register__form--input mb" type="password" />
        <Button label="SIGN UP" />
      </form> */}
    </section>
  );
};

export default Register;
