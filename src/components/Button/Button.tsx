import { MouseEventHandler } from "react";
import "./Button.scss";

export type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "light-grey"| "light-grey-lighter";
  onClick?: MouseEventHandler;
  size?: "large" | "medium" | "small";
};

const Button = ({ label, variant = "primary", size = "large", onClick,}: ButtonProps) => {
  return (
    <button className={`button button--${variant} && button button--${size}`}  onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
