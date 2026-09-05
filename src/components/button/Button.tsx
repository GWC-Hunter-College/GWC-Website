import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";
import styles from "./Button.module.css";

type ButtonStyleProps = {
  className?: string;
  variant?: "primary" | "light";
};

type NativeButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  }
> &
  ButtonStyleProps;

type LinkButtonProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  }
> &
  ButtonStyleProps;

type ButtonProps = NativeButtonProps | LinkButtonProps;

const getClassName = (variant: "primary" | "light", className: string) =>
  `${styles.button} ${styles[variant]} ${className}`;

const Button = (props: ButtonProps) => {
  if ("href" in props && props.href !== undefined) {
    const { children, className = "", variant = "primary", ...linkProps } = props;

    return (
      <a className={`${getClassName(variant, className)} ${styles.link}`} {...linkProps}>
        {children}
      </a>
    );
  }

  const { children, className = "", type = "button", variant = "primary", ...buttonProps } =
    props;

  return (
    <button className={getClassName(variant, className)} type={type} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
