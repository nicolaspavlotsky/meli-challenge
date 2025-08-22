import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  secondary?: boolean;
}

// For simplicity, I'm not using onClick or any other common button props
const Button = ({ label, secondary = false }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${secondary ? styles.secondary : ""}`}>
      {label}
    </button>
  );
};

export default Button;
