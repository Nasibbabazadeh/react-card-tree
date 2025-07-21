import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import styles from "./button.module.css";

export const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      outline: styles.outline,
      destructive: styles.destructive,
    },
    size: {
      icon: styles.icon,
      medium: styles.medium
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export interface IButtonProps
  extends React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
  className,
  variant,
  size,
  loading = false,
  children,
  icon,
  ...props
}) => {
  const isIconOnly = size === "icon" && !children;

  return (
    <button
      data-slot="button"
      className={buttonVariants({
        variant,
        size,
        className,
      })}
      disabled={loading || props.disabled}
      {...props}
    >
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {!isIconOnly && <span>{children}</span>}
    </button>
  );
};

export default Button;
