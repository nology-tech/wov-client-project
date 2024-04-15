import "./Login.scss";
import Button from "../../components/Button/Button";
import arrowLeft from "../../assets/images/arrow-left.png";
import { useState } from "react";


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
    return(
        <section className="register">
      <div className="register__icon--container">
        <img
          // onClick={handlePrevious}
          className="register__icon--arrow"
          src={arrowLeft}
          alt="&lt;"
        />
      </div>
      <h2 className="register__heading">Sign In</h2>
      <form className="register__form" action="#">
          <label className="register__label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            // value={formData.email}
            className="register__input"
            type="email"
            placeholder="you@example.com"
            // onChange={handleChange}
          />
          </form>
          <input
            id="password"
            name="password"
            // value={formData.password}
            className="register__input"
            type="password"
            placeholder="Your password"
            // onChange={handleChange}
          />
          <Button label="Sign In" />
      </section>
    )
}

export default Login;
