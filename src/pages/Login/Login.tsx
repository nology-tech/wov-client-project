import "./Login.scss";
import Button from "../../components/Button/Button";
import arrowLeft from "../../assets/images/arrow-left.png";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthError } from "firebase/auth";

const emptyFormData = {
  email: "",
  password: "",
};

type LoginProps = {
  setUserUID: (arg0: string) => void;
};

export const Login = ({ setUserUID }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyFormData);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUserUID(userCredential.user.uid);
      const accessToken = await userCredential.user.getIdToken();
      localStorage.setItem("accessToken", JSON.stringify(accessToken))
      navigate("/");
    } catch (error) {
      const errorCode = (error as AuthError).code
      if (errorCode === "auth/invalid-credential") {
        setFormErrorMessage("Invalid email/password");
      } else {
        setFormErrorMessage(
          "Oops, something went wrong. Try again in a few minutes"
        );
      }
    }
  };
  
  
  const handlePrevious = () => {
    navigate(-1);
  };

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
      <form className="sign-in__form" action="#" onSubmit={onLogin}>
        <label className="sign-in__label" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          className="sign-in__input"
          type="email"
          placeholder="you@example.com"
          onChange={handleChange}
        />
        <label className="sign-in__label" htmlFor="lastName">
          Password
        </label>
        <input
          id="password"
          name="password"
          className="sign-in__input"
          type="password"
          placeholder="Your password"
          onChange={handleChange}
        />
        <Button label="Sign In" />
        <p className="sign-in__error-message">{formErrorMessage}</p>
      </form>
    </section>
  );
};

export default Login;