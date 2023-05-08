import { classed } from "@tw-classed/react";
import Link, { type LinkProps } from "next/link";

export type ButtonProps = React.ComponentProps<typeof Button>;

export const Button = classed.button(
  "rounded-full py-1 px-3 inline-flex gap-0.5 justify-center items-center overflow-hidden text-sm font-medium transition",
  {
    variants: {
      variant: {
        primary:
          "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-1 dark:ring-inset dark:ring-primary-400/20 dark:hover:bg-primary-400/10 dark:hover:text-primary-300 dark:hover:ring-primary-300",
        secondary:
          "bg-zinc-100 text-gray-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-gray-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-gray-300",
        filled:
          "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400",
        outline:
          "text-gray-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-gray-900 dark:text-gray-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white",
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
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonLinkProps = LinkProps & ButtonProps;

export const ButtonLink: React.FC<ButtonLinkProps> = ({ children, href, ...rest }) => {
  return (
    <Link href={href}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};
