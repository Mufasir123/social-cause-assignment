"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...rest}
    />
  );
});

Label.displayName = "Label";

export { Label };
