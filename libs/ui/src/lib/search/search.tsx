"use client";

import * as React from "react";
import { Input } from "../input/input";
import { useRouter, usePathname } from "next/navigation";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ className, type, ...props }, ref) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (event.target.value) {
      searchParams.set("search", event.target.value);
    } else {
      searchParams.delete("search");
    }

    startTransition(() => {
      replace(`${pathname}?${searchParams.toString()}`);
    });
  };

  return (
    <Input
      placeholder="Search Pokemon"
      className={className}
      onChange={onChange}
      ref={ref}
      isLoading={isPending}
      {...props}
    />
  );
});
