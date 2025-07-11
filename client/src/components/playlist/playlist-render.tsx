import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TracksRender from "../track/tracks-render";
import { useEffect } from "react";
import { useBackground } from "@/lib/hooks/useBackground";
import { useQuery } from "@tanstack/react-query";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { useAverageColor } from "@/lib/hooks/useAverageColor";
import { Skeleton } from "../ui/skeleton";

export default function PlaylistRender({ playlistId }: { playlistId: string }) {
  const { data: playlistData } = useQuery(playlistDataQueryOptions(playlistId));
  const { data: playlistItems } = useQuery(
    playlistItemsQueryOptions(playlistId),
  );
  const { data: color = "#000000", isFetching: colorFetching } =
    useAverageColor(playlistData?.image_url, { saturate: 10 });

  const { setImageUrl } = useBackground();
  useEffect(() => {
    (async () => {
      if (playlistData?.image_url) {
        setImageUrl(playlistData.image_url);
      }
    })();
  }, [playlistData, setImageUrl]);

  if (!playlistData || !playlistItems || colorFetching)
    return <Skeleton className="h-104 w-full rounded-xs" />;

  return (
    <Card
      className="flex w-full overflow-hidden rounded-xs p-0"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 95%, white 5%)`
          : undefined,
      }}
    >
      <div className="relative flex flex-row items-center space-x-3 px-3 py-2">
        <img
          src={playlistData.image_url}
          alt={playlistData.name}
          className={cn("h-20 w-20 rounded-xs object-cover shadow-md")}
        />
        <div>
          <h1 className="text-3xl font-bold">{playlistData.name}</h1>
          <div className="text-muted-foreground flex flex-col text-xs">
            <p>{playlistData.total} songs</p>
          </div>
        </div>
      </div>
      <div
        className="p-3"
        style={{
          backgroundColor: color
            ? `color-mix(in srgb, ${color} 60%, black 40%)`
            : undefined,
        }}
      >
        <TracksRender items={playlistItems} minimal />
      </div>
    </Card>
  );
}
