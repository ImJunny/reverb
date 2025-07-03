import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  playlistInfoQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { cn } from "@/lib/utils";
import TracksRender from "@/components/playlist/tracks-render";
import { useBackground } from "@/lib/hooks/useBackground";
import { useEffect } from "react";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/playlist/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/playlist/$id" });
  const { data: playlistInfo } = useQuery(playlistInfoQueryOptions(id));
  const { data: playlistItems } = useQuery(playlistItemsQueryOptions(id));

  const { setImageUrl } = useBackground();

  useEffect(() => {
    if (playlistInfo?.images && playlistInfo.images[0]?.url) {
      const imageUrl = playlistInfo.images[0].url;
      setImageUrl(imageUrl);
    }
  }, [playlistInfo, setImageUrl]);

  if (!playlistInfo || !playlistItems) return <></>;

  return (
    <BackgroundWrapper type="blur" moving className="flex h-full flex-col">
      <div className="relative mx-3 mt-8 mb-4 flex w-full justify-center">
        <div className="mx-3 flex w-full max-w-5xl space-x-4">
          {playlistInfo.images ? (
            <img
              src={playlistInfo.images[0]?.url}
              alt={playlistInfo.name}
              className={cn(
                "h-29 w-29 object-cover shadow-2xl sm:h-40 sm:w-40",
              )}
            />
          ) : (
            <div className="bg-muted aspect-square h-40 w-40 rounded-sm" />
          )}
          <div>
            <p className="text-sm">
              {playlistInfo.public ? "Public" : "Private"}
            </p>
            <h1 className="text-2xl font-extrabold tracking-wide md:text-4xl lg:text-6xl">
              {playlistInfo.name}
            </h1>
            <div className="text-muted-foreground flex flex-col text-sm">
              <p className="text-sm">{playlistInfo.tracks.total} songs</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button className="h-6">Playlist</Button>
              <Button className="h-6" variant="outline">
                Posts (4)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center bg-black/25">
        <div className="mx-3 w-full max-w-5xl justify-center pb-3">
          <TracksRender items={playlistItems.items} />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
