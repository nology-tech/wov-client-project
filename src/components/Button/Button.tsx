import { MouseEventHandler } from "react";
import "./Button.scss";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "light-grey";
  onClick?: MouseEventHandler;
};

const Button = ({ label, variant = "primary", onClick }: ButtonProps) => {
  return (
    <button className={`button button--${variant} `} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
