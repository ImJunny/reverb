import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TracksRender from "./tracks-render";
import { useEffect } from "react";
import { useBackgroundColor } from "@/lib/hooks/useBackgroundColor";
import { getAverageColor } from "@/lib/scripts/getAverageColor";

export default function PlaylistRender({
  playlistInfo,
  playlistItems,
}: {
  playlistInfo: SpotifyApi.PlaylistObjectFull;
  playlistItems: SpotifyApi.PlaylistTrackResponse;
}) {
  const { color, setColor } = useBackgroundColor();
  useEffect(() => {
    (async () => {
      if (playlistInfo?.images[0]?.url) {
        const avgColor = await getAverageColor(playlistInfo.images[0].url);
        setColor(avgColor);
      }
    })();
  }, [playlistInfo, setColor]);

  return (
    <Card
      className="flex w-full overflow-hidden p-0"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 95%, white 5%)`
          : undefined,
      }}
    >
      <div className="relative flex flex-row space-x-3 px-3 py-4">
        <img
          src={playlistInfo.images[0]?.url}
          alt={playlistInfo.name}
          className={cn("h-20 w-20 rounded-sm object-cover")}
        />
        <div>
          <h1 className="text-3xl font-bold">{playlistInfo.name}</h1>
          <div className="text-foreground/90 flex flex-col text-xs">
            <p>{playlistInfo.tracks.total} songs</p>
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
        <TracksRender playlistItems={playlistItems} minimal />
      </div>
    </Card>
  );
}
