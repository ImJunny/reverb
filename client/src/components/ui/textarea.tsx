import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({
  className,
  label,
  scrollable = true,
  ...props
}: React.ComponentProps<"textarea"> & {
  label?: string;
  scrollable?: boolean;
}) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (scrollable) return;
    const el = e.currentTarget;
    el.style.height = "auto"; // reset
    el.style.height = el.scrollHeight + "px"; // grow to content
  };

  return (
    <div className="relative">
      <textarea
        data-slot="textarea"
        ref={ref}
        className={cn(
          "peer bg-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-xs px-3 py-2 text-base shadow-xs transition-[color,box-shadow] duration-0 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:ring-ring/50 focus:bg-input/50 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 resize-none",
          scrollable
            ? "overflow-auto" // fixed height + scroll
            : "overflow-hidden", // grow-to-fit
          className,
        )}
        {...props}
        onInput={(e) => {
          handleInput(e);
          props.onInput?.(e);
        }}
        onFocus={(e) => {
          props.onFocus?.(e);
          e.currentTarget.placeholder = "";
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          e.currentTarget.placeholder = props.placeholder || "";
        }}
      />
      <div
        className={cn(
          "text-muted-foreground pointer-events-none absolute top-0 left-3 -translate-y-1/2 transform text-xs opacity-0 transition-opacity duration-200",
          "peer-focus:opacity-100",
        )}
      >
        <div className="bg-input/50 absolute bottom-0 flex h-4/7 w-full" />
        <span className="relative z-1 mx-[3px]">
          {label ?? props.placeholder}
        </span>
      </div>
    </div>
  );
}

export { Textarea };
