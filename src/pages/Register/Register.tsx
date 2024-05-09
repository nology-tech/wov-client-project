import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/images/arrow-left.png";
import Button from "../../components/Button/Button";
import "./Register.scss";
import { NewUser } from "../../types/User";
import { useAuth } from "../../hooks/useAuth";
import { useFirestore } from "../../hooks/useFireStore";
import { GroupData } from "../../types/Groups";

const emptyFormData: NewUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  bio: "",
  img: "",
  tribe: "",
};

const Register = () => {
  const { createUser } = useAuth();
  const [formData, setFormData] = useState<NewUser>(emptyFormData);
  const [passwordMatchError, setPasswordMatchError] = useState<string>("");
  const [missingFieldsError, setMissingFieldsError] = useState<string>("");
  const [showSecondForm, setShowSecondFrom] = useState<boolean>(false);
  const [showUploadPrompt, setShowUploadPrompt] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const {getTribes} = useFirestore()
  const [tribes, setTribes] = useState<GroupData[]>([]);


  useEffect(() => {
    const getTribeData = async () => {
      const result = await getTribes();
      setTribes(result);
    };
    getTribeData();
  }, [getTribes]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.bio &&
      formData.tribe
    ) {
      setShowSecondFrom(true);
    } else {
      setMissingFieldsError("Please fill all required fields.");
    }
  };

  const handlePrevious = () => {
    showSecondForm ? setShowSecondFrom(false) : navigate(-1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match. Try again.");
      }

      if (passwordMatchError) {
        setPasswordMatchError("");
      }

      const { error } = await createUser(formData, selectedFile ?? undefined);

      if (error) {
        throw new Error(error);
      }

    } catch (error) {
      setPasswordMatchError((error as Error).message);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };


  const handleTribeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setFormData({ ...formData, [name]: value });
    console.log("name:",name)
    console.log("value:",value)
  };

  const handleShowUploadPrompt = () => {
    setShowUploadPrompt(!showUploadPrompt);
  };

  console.log("formData:", formData);
  return (
    <section className="register">
      <div className="register__icon--container">
        <img
          onClick={handlePrevious}
          className="register__icon--arrow"
          src={arrowLeft}
          alt="Arrow Left Icon"
        />
      </div>
      <h2 className="register__heading">Create An Account</h2>

      {!showSecondForm ? (
        <form onSubmit={handleSubmit} className="register__form" action="#">
          <label className="register__label" htmlFor="firstName">
            First Name*
          </label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            className="register__input"
            type="text"
            placeholder="John"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="lastName">
            Last Name*
          </label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            className="register__input"
            type="text"
            placeholder="Smith"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="bio">
            Bio*
          </label>
          <input
            id="bio"
            name="bio"
            value={formData.bio}
            className="register__input "
            type="text"
            placeholder="Bio"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="tribe">
            Tribe*
          </label>
          <select
            id="tribe"
            name="tribe"
            value={formData.tribe}
            className="register__input register__input--margin-bottom"
            onChange={handleTribeChange}
          >
            {tribes.map((tribe) => (
              <option key={tribe.name} value={tribe.name}>
                {tribe.name}
              </option>
            ))}

            <option value=""></option>
            {/* <option value="test-tribe">test-tribe</option> */}
          </select>
          {missingFieldsError && (
            <p className="register__error-message--missing-fields">
              {missingFieldsError}
            </p>
          )}
          <label className="register__label" htmlFor="img"></label>
          {showUploadPrompt ? (
            <input
              id="img"
              name="img"
              value={formData.img}
              className="register__input register__input--img-upload"
              type="file"
              onChange={handleFileInputChange}
            />
          ) : (
            <Button
              label="ADD PROFILE IMAGE"
              variant="light-grey"
              onClick={handleShowUploadPrompt}
            />
          )}
          {selectedFile && (
            <p className="register__error-message--file-name">
              {selectedFile.name}
            </p>
          )}
          <Button label="Next" variant="light-grey" onClick={handleNext} />
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="register__form" action="#">
          <label className="register__label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            className="register__input"
            type="email"
            placeholder="you@example.com"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={formData.password}
            className="register__input"
            type="password"
            placeholder="Your password"
            onChange={handleChange}
          />
          <label className="register__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            className="register__input with-margin-bottom"
            type="password"
            onChange={handleChange}
          />
          {passwordMatchError && (
            <p className="register__error-message">{passwordMatchError}</p>
          )}
          <Button label="SIGN UP" />
        </form>
      )}
    </section>
  );
};

export default Register;
