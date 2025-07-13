import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TracksRender from "../track/tracks-render";
import { useQuery } from "@tanstack/react-query";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { Skeleton } from "../ui/skeleton";
import { useBackgroundChange } from "@/lib/hooks/useBackgroundChange";

export default function PlaylistRender({ playlistId }: { playlistId: string }) {
  const { data: playlistData } = useQuery(playlistDataQueryOptions(playlistId));
  const { data: playlistItems } = useQuery(
    playlistItemsQueryOptions(playlistId),
  );

  const { color } = useBackgroundChange({
    imageUrl: playlistData?.image_url,
    type: "blur",
  });

  if (!playlistData || !playlistItems || !color)
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
