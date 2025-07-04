import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TracksRender from "./tracks-render";
import { useEffect } from "react";
import { useBackground } from "@/lib/hooks/useBackground";

export default function PlaylistRender({
  playlistData,
  items,
}: {
  playlistData: SpotifyApi.PlaylistObjectFull;
  items: SpotifyApi.PlaylistTrackObject[];
}) {
  const { color, setImageUrl } = useBackground();
  useEffect(() => {
    (async () => {
      if (playlistData?.images[0]?.url) {
        const imageUrl = playlistData.images[0].url;
        setImageUrl(imageUrl);
      }
    })();
  }, [playlistData, setImageUrl]);

  return (
    <Card
      className="flex w-full p-0"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 95%, white 5%)`
          : undefined,
      }}
    >
      <div className="relative flex flex-row items-center space-x-3 px-3 py-2">
        <img
          src={playlistData.images[0]?.url}
          alt={playlistData.name}
          className={cn("h-20 w-20 rounded-sm object-cover shadow-md")}
        />
        <div>
          <h1 className="text-3xl font-bold">{playlistData.name}</h1>
          <div className="text-muted-foreground flex flex-col text-xs">
            <p>{playlistData.tracks.total} songs</p>
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
        <TracksRender items={items} minimal />
      </div>
    </Card>
  );
}
