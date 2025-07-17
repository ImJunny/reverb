import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  transparent?: boolean;
};

export default function Card({ className, transparent, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-sm p-3",
        transparent && "bg-card/50 shadow-xl ring-1 ring-black/5",
        className,
      )}
      {...props}
    />
  );
}
