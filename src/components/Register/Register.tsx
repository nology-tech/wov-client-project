import "./Register.scss";
import Button from "../Button/Button";
import arrowLeft from "../../assets/images/arrow-left.png";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_TOKEN,
  authDomain: "wov-client-project.firebaseapp.com",
  projectId: "wov-client-project",
  storageBucket: "wov-client-project.appspot.com",
  messagingSenderId: "500736757552",
  appId: "1:500736757552:web:2a7142e64715df07aec2f5",
  measurementId: "G-CJVJ3K385S",
};
initializeApp(firebaseConfig);

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("user registered successfully", userCredentials.user);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <section className="register">
      <div className="register__icon--container">
        <Link to={"#"}>
          <img
            className="register__icon--arrow"
            src={arrowLeft}
            alt="Arrow Left Icon"
          />
        </Link>
      </div>
      <h2 className="register__heading">Create Account</h2>

      {/* <form onSubmit={handleSubmit} className="register__form" action="#">
        <label className="register__form--label" htmlFor="">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          className="register__form--input"
          type="text"
          placeholder="John"
          onChange={handleChange}
        />
        <label className="register__form--label" htmlFor="">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          className="register__form--input with-margin-bottom"
          type="text"
          placeholder="Smith"
          onChange={handleChange}
        />
        <Button label="Next" />
      </form> */}

      <form onSubmit={handleSubmit} className="register__form" action="#">
        <label className="register__form--label" htmlFor="">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          value={formData.email}
          className="register__form--input"
          type="email"
          placeholder="you@example.com"
          onChange={handleChange}
        />
        <label className="register__form--label" htmlFor="">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={formData.password}
          className="register__form--input"
          type="password"
          placeholder="Your password"
          onChange={handleChange}
        />
        <label className="register__form--label" htmlFor="">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          className="register__form--input with-margin-bottom"
          type="password"
          onChange={handleChange}
        />
        <Button label="SIGN UP" />
      </form>
    </section>
  );
};

export default Register;
