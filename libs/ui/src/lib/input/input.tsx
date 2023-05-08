import * as React from "react";
import { classnames } from "@pokemon/utility/shared";
import styles from "../loading-dots.module.css";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, isLoading, ...props }, ref) => {
  return (
    <div className="relative rounded-md">
      <input
        type={type}
        className={classnames(
          "border-gray-6 ring-offset-gray-6 placeholder:text-gray-11 focus-visible:ring-red-6 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
      {isLoading ? (
        <span className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ${styles.loading}`}>
          <span style={{ backgroundColor: "hsl(var(--primary))" }} />
          <span style={{ backgroundColor: "hsl(var(--primary))" }} />
          <span style={{ backgroundColor: "hsl(var(--primary))" }} />
        </span>
      ) : (
        props.children
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
