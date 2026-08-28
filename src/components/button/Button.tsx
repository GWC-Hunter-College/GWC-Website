import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "light";
  }
>;

const Button = ({ children, className = "", type = "button", variant = "primary", ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
