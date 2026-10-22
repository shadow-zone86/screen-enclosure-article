import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps =
  | (CommonProps & { href: string })
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

function buttonClass(variant: ButtonVariant, className?: string): string {
  return [styles.root, styles[variant], className].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const { variant = "primary", className } = props;

  if (props.href !== undefined) {
    return (
      <Link className={buttonClass(variant, className)} href={props.href}>
        {props.children}
      </Link>
    );
  }

  const { children, variant: _variant, className: _className, ...rest } = props;
  return (
    <button type="button" className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}
