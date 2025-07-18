import Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trackDataQueryOptions } from "@/lib/api-options";
import { useBackgroundChange } from "@/lib/hooks/useBackgroundChange";
import { enhanceColor } from "@/lib/scripts/enhanceColor";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { type HTMLAttributes, type ReactNode } from "react";
import type { Track } from "shared/types";

type GeneralTrackCardProps = {
  trackId: string;
  children?: (trackData: Track) => ReactNode;
  affectBackground?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export default function GeneralTrackCard({
  trackId,
  className,
  children,
  affectBackground = false,
  ...props
}: GeneralTrackCardProps) {
  const { data: trackData, isFetching } = useQuery(
    trackDataQueryOptions(trackId),
  );

  const { color } = useBackgroundChange({
    imageUrl: trackData?.album.image_url,
    type: "gradient",
    affectBackground,
  });

  if (!trackData) return null;

  if (isFetching || !color)
    return <Skeleton className={cn("h-20 w-full rounded-xs", className)} />;

  return (
    <Card
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={cn(
        "bg-background flex w-full cursor-default flex-row rounded-xs p-3 shadow-lg ring-2 ring-black/5",
        className,
      )}
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${enhanceColor(color, 20)} 75%, #000 25%)`
          : undefined,
      }}
      {...props}
    >
      <img
        src={trackData?.album.image_url || ""}
        alt="Track"
        className="rounded-xxs h-14 w-14 object-cover shadow-md"
      />
      <div className="ml-3 flex flex-1 flex-col">
        <p className="text-muted-foreground text-xs">Song</p>
        <h3 className="mt-auto text-sm font-semibold">{trackData?.name}</h3>
        <p className="text-muted-foreground text-xs">
          {trackData?.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      {children?.(trackData)}
    </Card>
  );
}
