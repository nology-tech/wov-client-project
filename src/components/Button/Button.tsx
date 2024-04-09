import "./Button.scss";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "light-grey";
  size?: "sm" | "md";
  onClick?: () => void;
};

const Button = ({
  label,
  variant = "primary",
  size = "sm",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
