import { ScrollArea } from "@/components/ui/scroll-area";
import { useBackgroundColor } from "@/lib/hooks/useBackgroundColor";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function BackgroundWrapper({
  gradient = false,
  // moving = false,
  children,
  className,
}: {
  gradient?: boolean;
  moving?: boolean;
  children?: ReactNode;
  className?: React.ComponentProps<"div">["className"];
}) {
  const { color } = useBackgroundColor();

  return (
    <ScrollArea className="flex flex-1 overflow-hidden rounded-sm">
      <div
        className="absolute inset-0 -z-10"
        style={
          gradient
            ? {
                backgroundImage: `linear-gradient(to top, var(--muted), var(--muted), ${color})`,
              }
            : { backgroundColor: "var(--muted)" }
        }
      />
      <div className={cn("flex w-full justify-center", className)}>
        {children}
      </div>
    </ScrollArea>
  );
}
