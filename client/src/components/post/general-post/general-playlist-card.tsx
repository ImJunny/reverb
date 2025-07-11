import Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { playlistDataQueryOptions } from "@/lib/api-options";
import { useAverageColor } from "@/lib/hooks/useAverageColor";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { type HTMLAttributes, type ReactNode } from "react";
import type { PlaylistData } from "shared/types";

export default function GeneralPlaylistCard({
  playlistId,
  className,
  children,
}: {
  playlistId: string;
  children?: ((playlistData: PlaylistData) => ReactNode) | ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">) {
  const { data: playlistData } = useQuery({
    ...playlistDataQueryOptions(playlistId),
    staleTime: 1000 * 60 * 5,
  });
  const { data: color = "#000000", isFetching: colorFetching } =
    useAverageColor(playlistData?.image_url, { saturate: 10 });

  if (!playlistData || colorFetching)
    return <Skeleton className={cn("h-28 w-full rounded-xs", className)} />;

  return (
    <Card
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={cn(
        "relative flex cursor-default flex-row space-x-3 rounded-xs p-3 shadow-lg ring-1 ring-black/5",
        className,
      )}
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 95%, white 5%)`
          : undefined,
      }}
    >
      <img
        src={playlistData.image_url}
        alt={playlistData.name}
        className={cn("rounded-xxs h-22 w-22 object-cover shadow-md")}
      />
      <div className="flex flex-1 flex-col">
        <p className="text-muted-foreground text-xs">Playlist</p>
        <h1 className="mt-auto text-2xl font-bold">{playlistData.name}</h1>
        <p className="text-muted-foreground mb-3 text-xs">
          {playlistData.total} songs
        </p>
      </div>
      {typeof children === "function"
        ? (children as (playlistData: PlaylistData) => ReactNode)(playlistData)
        : children}
    </Card>
  );
}
