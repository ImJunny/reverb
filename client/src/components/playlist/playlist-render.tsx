import Card from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TracksRender from "./tracks-render";
import { useEffect } from "react";
import { useBackground } from "@/lib/hooks/useBackground";
import type { PlaylistData, PlaylistItem } from "shared/types";

export default function PlaylistRender({
  playlistData,
  items,
}: {
  playlistData: PlaylistData;
  items: PlaylistItem[];
}) {
  const { color, setImageUrl } = useBackground();
  useEffect(() => {
    (async () => {
      if (playlistData?.image_url) {
        setImageUrl(playlistData.image_url);
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
          src={playlistData.image_url}
          alt={playlistData.name}
          className={cn("h-20 w-20 rounded-sm object-cover shadow-md")}
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
        <TracksRender items={items} minimal />
      </div>
    </Card>
  );
}
