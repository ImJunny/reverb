import Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function GeneralPlaylistCard({
  playlistId,
}: {
  playlistId: string;
}) {
  const { data: playlistData } = useQuery({
    ...playlistDataQueryOptions(playlistId),
  });
  const { data: playlistItems } = useQuery({
    ...playlistItemsQueryOptions(playlistId),
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

  if (!playlistData || !playlistItems)
    return <Skeleton className="h-28 w-full rounded-xs" />;

  return (
    <Card
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="relative flex cursor-default flex-row space-x-3 rounded-xs p-3 shadow-lg ring-1 ring-black/5"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 95%, white 5%)`
          : undefined,
      }}
    >
      <img
        src={playlistData.image_url}
        alt={playlistData.name}
        className={cn("h-22 w-22 rounded-xs object-cover shadow-md")}
      />
      <div className="flex flex-1 flex-col">
        <p className="text-muted-foreground text-xs">Playlist</p>
        <h1 className="text-sm font-semibold">{playlistData.name}</h1>
        <ul className="mt-auto flex flex-col">
          {playlistItems.slice(0, 3).map((item) => (
            <li key={item.id} className="text-xs">
              <span>{item.name}</span>
              <span className="text-muted-foreground">
                &nbsp;• {item.artists[0]?.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
