import "./Login.scss";
import Button from "../../components/Button/Button";
import arrowLeft from "../../assets/images/arrow-left.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const emptyFormData = {
  email: "",
  password: "",
}

export const Login = () => {
  const [showSecondForm, setShowSecondFrom] = useState<boolean>(false);

  // const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  //     if (formData.firstName && formData.lastName) {
  //       setShowSecondFrom(true);
  //     }
  //   };

  // const handlePrevious = () => {
  //     showSecondForm ? setShowSecondFrom(false) : navigate(-1);
  //   };

  const handlePrevious = () => {
    navigate(-1);
  };

  const navigate = useNavigate();

  return (
    <section className="sign-in">
      <div className="sign-in__icon--container">
        <img
          onClick={handlePrevious}
          className="sign-in__icon--arrow"
          src={arrowLeft}
          alt="Arrow Left Icon"
        />
      </div>
      <h2 className="sign-in__heading">Welcome Back</h2>
      <form className="sign-in__form" action="#">
        <label className="sign-in__label" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          // value={formData.email}
          className="sign-in__input"
          type="email"
          placeholder="you@example.com"
        // onChange={handleChange}
        />
      <label className="register__label" htmlFor="lastName">
            Last Name
          </label>
      <input
        id="password"
        name="password"
        // value={formData.password}
        className="sign-in__input"
        type="password"
        placeholder="Your password"
      // onChange={handleChange}
      />
      <Button label="Sign In" />
      </form>
    </section>
  )
}

export default Login;
