import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        className={cn(
          "peer placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus:bg-input/50 bg-input flex min-h-16 w-full min-w-0 rounded-xs px-3 py-2 text-base shadow-xs transition-[color,box-shadow] duration-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:ring-ring/50 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
        onFocus={(e) => {
          if (props.onFocus) props.onFocus(e);
          e.target.placeholder = "";
        }}
        onBlur={(e) => {
          if (props.onBlur) props.onBlur(e);
          e.target.placeholder = props.placeholder || "";
        }}
      />
      <div
        className={cn(
          "text-muted-foreground pointer-events-none absolute top-0 left-3 -translate-y-1/2 transform text-xs opacity-0 transition-opacity duration-200",
          "peer-focus:opacity-100",
        )}
      >
        <div className="bg-input/50 absolute bottom-0 flex h-4/7 w-full" />
        <span className={cn("relative z-1 mx-[3px]")}>{props.placeholder}</span>
      </div>
    </div>
  );
}

export { Textarea };
