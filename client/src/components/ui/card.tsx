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
        transparent && "bg-card/80",
        className,
      )}
      {...props}
    />
  );
}
