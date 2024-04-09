import "./Button.scss";

type ButtonProps = {
  label: string;
  variant: "primary" | "secondary" | "light-grey";
};

const Button = ({ label, variant }: ButtonProps) => {
  return <button className={`button button--${variant}`}>{label}</button>;
};

export default Button;
