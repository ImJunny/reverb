import Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, type HTMLAttributes } from "react";

export default function GeneralPlaylistCard({
  playlistId,
  className,
}: {
  playlistId: string;
} & HTMLAttributes<HTMLDivElement>) {
  const { data: playlistData } = useQuery({
    ...playlistDataQueryOptions(playlistId),
  });

  const [color, setColor] = useState<string | null>(null);
  const imageUrl = playlistData?.image_url;
  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const avgColor = await getAverageColor(imageUrl);
        setColor(avgColor);
      }
    })();
  }, [imageUrl]);

  if (!playlistData) return <Skeleton className="h-28 w-full rounded-xs" />;

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
    </Card>
  );
}
