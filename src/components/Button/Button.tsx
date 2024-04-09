import "./Button.scss";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "light-grey";
  size?: "sm" | "md";
};

const Button = ({ label, variant = "primary", size = "sm" }: ButtonProps) => {
  return (
    <button className={`button button--${variant} button--${size}`}>
      {label}
    </button>
  );
};

export default Button;
