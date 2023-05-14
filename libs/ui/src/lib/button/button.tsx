import { classnames } from "@pokemon/utility/shared";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import * as React from "react";
import styles from "../loading-dots.module.css";

const buttonVariants = cva(
  "rounded-md py-1 px-3 inline-flex gap-0.5 justify-center items-center overflow-hidden text-sm font-medium transition",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-gray-3 dark:text-gray-11 dark:ring-1 dark:ring-inset dark:ring-gray-6 dark:hover:bg-primary-400/10 dark:hover:text-gray-12 dark:hover:ring-gray-7",
        secondary:
          "bg-zinc-100 text-gray-12 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-gray-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-gray-300",
        filled:
          "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400",
        outline:
          "text-gray-11 border border-gray-6 hover:bg-gray-1 hover:text-gray-12 dark:hover:bg-gray-3 dark:hover:text-gray-12",
        text: "text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500",
        ghost:
          "bg-transparent text-slate-12 hover:bg-slate-1 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
      },
      size: {
        default: "h-7 py-1 px-3",
        sm: "h-5 py-0.5 px-2",
        lg: "h-9 py-2 px-5 text-lg",
        xl: "h-11 py-3 px-7 text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component className={classnames(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isLoading ? (
          <span className={`pointer-events-none ${styles.loading}`}>
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
          </span>
        ) : (
          children
        )}
      </Component>
    );
  },
);

Button.displayName = "Button";

type ButtonLinkProps = LinkProps & ButtonProps;

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, href, isLoading, ...rest }) => {
  return (
    <Link className="isolate" href={href}>
      <Button className="relative" {...rest}>
        {isLoading ? (
          <span className={`pointer-events-none ${styles.loading}`}>
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
            <span style={{ backgroundColor: "hsl(var(--primary))" }} />
          </span>
        ) : (
          children
        )}
      </Button>
    </Link>
  );
};

export { Button, ButtonLink, buttonVariants };
