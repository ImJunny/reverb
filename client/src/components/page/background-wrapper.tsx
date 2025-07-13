import { ScrollArea } from "@/components/ui/scroll-area";
import { useBackground } from "@/lib/hooks/useBackground";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type BackgroundWrapperProps = {
  children?: ReactNode;
  className?: string;
};

// BackgroundWrapper component that provides a background for the content
export default function BackgroundWrapper({
  children,
  className,
}: BackgroundWrapperProps) {
  const { color, imageUrl, type, moving } = useBackground();
  return (
    <ScrollArea className="bg-muted relative flex h-full flex-1 overflow-hidden rounded-sm transition-all duration-1000">
      {!moving && (
        <SpecialBackgroundWrapper
          type={type ?? "default"}
          color={color}
          imageUrl={imageUrl}
        />
      )}

      <div className="relative h-full w-full">
        {moving && (
          <SpecialBackgroundWrapper
            type={type ?? "default"}
            color={color}
            imageUrl={imageUrl}
          />
        )}
        <div
          className={cn("relative z-2 flex w-full justify-center", className)}
        >
          {children}
        </div>
      </div>
    </ScrollArea>
  );
}

// SpecialBackgroundWrapper component that conditionally renders the background based on the type
function SpecialBackgroundWrapper({
  type,
  imageUrl,
  color,
}: {
  type: "default" | "gradient" | "blur";
  imageUrl?: string;
  color: string;
}) {
  if (type === "default") return null;

  return (
    <div className="absolute inset-0 z-0 h-full">
      {type === "gradient" && <GradientBackground color={color} compact />}
      {type === "blur" && imageUrl && <BlurBackground imageUrl={imageUrl} />}
    </div>
  );
}

// GradientBackground component that renders a gradient background
function GradientBackground({
  color,
  compact,
}: {
  color: string;
  compact?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 z-1 h-full"
      style={{
        backgroundImage: `linear-gradient(to top, var(--muted), var(--muted) ${compact ? "70%" : ""}, ${color}) `,
      }}
    />
  );
}

// BlurBackground component that renders a blurred background image
function BlurBackground({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute h-180 w-full overflow-hidden">
      <div
        className="absolute inset-0 z-1 bg-cover bg-center blur-3xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <GradientBackground color={"transparent"} />
    </div>
  );
}
