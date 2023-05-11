"use client";

import { Button, ButtonProps } from "@pokemon/ui";
import * as React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const Submit = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { pending } = useFormStatus();
  return <Button type="submit" isLoading={pending} ref={ref} {...props} />;
});
