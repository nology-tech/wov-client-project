import { MouseEventHandler } from "react";
import "./Button.scss";

export type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "light-grey"| "light-grey-lighter";
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
