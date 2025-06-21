import Card from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  playlistInfoQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { FastAverageColor } from "fast-average-color";
// import { Vibrant } from "node-vibrant/browser";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_protected/playlist/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/playlist/$id" });
  const { data: playlistInfo } = useQuery(playlistInfoQueryOptions(id));
  const { data: playlistItems } = useQuery(playlistItemsQueryOptions(id));
  // const [color, setColor] = useState<string>("#000000");

  // useEffect(() => {
  //   const fac = new FastAverageColor();
  //   if (playlistInfo && playlistInfo.images.length > 0) {
  //     fac
  //       .getColorAsync(playlistInfo.images[0]?.url as string, {
  //         algorithm: "sqrt", // Better for vibrant-like results than 'simple'
  //         mode: "precision", // Increases accuracy
  //         step: 5, // Increases performance without sacrificing much quality
  //         ignoredColor: [255, 255, 255, 255, 50], // ignore pure white (Spotify does this too)
  //       })
  //       .then((res) => {
  //         setColor(res.hex);
  //         console.log("Average color:", res);
  //       });
  //   }
  // }, [playlistInfo]);

  // useEffect(() => {
  //   if (!playlistInfo || !playlistInfo.images.length) return;
  //   Vibrant.from(playlistInfo.images[0]!.url!)
  //     .getPalette()
  //     .then((palette) => {
  //       const vibrantColor = palette.Muted?.hex || "#000000";
  //       setColor(vibrantColor);
  //     });
  // }, [playlistInfo]);

  if (!playlistInfo || !playlistItems)
    return <div className="flex w-full justify-center">Loading...</div>;

  console.log(playlistItems.items);
  return (
    <div className="flex w-full justify-center">
      <Card className="flex w-full max-w-2xl">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex flex-row space-x-3 p-3"
            // style={{ backgroundColor: color }}
          >
            <img
              src={playlistInfo.images[0]?.url}
              alt={playlistInfo.name}
              className="aspect-square h-32 w-32 rounded-sm object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">{playlistInfo.name}</h1>
              <div className="text-foreground/60 flex flex-col text-sm">
                <p>{playlistInfo.tracks.total} songs</p>
                <p>{playlistInfo.public ? "Public" : "Private"}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="text-foreground/60 flex space-x-3 px-3 text-sm">
              <p>#</p>
              <p>Title</p>
            </div>
            <Separator className="mt-2" />
          </div>

          <ScrollArea className="h-full max-h-96">
            <div className="mt-3 flex flex-col space-y-3">
              {playlistItems.items.map((track, idx) => (
                <div
                  key={track.track!.id}
                  className="flex items-center space-x-3 px-3"
                >
                  <p className="text-foreground/60 text-sm font-light">
                    {idx + 1}
                  </p>
                  <img
                    src={track.track?.album.images[0]?.url}
                    alt="track"
                    className="h-9 w-9 rounded-xs object-cover"
                  />
                  <div>
                    <p className="text-sm">{track.track!.name}</p>
                    <p className="text-foreground/60 text-xs">
                      {track
                        .track!.artists.map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}
