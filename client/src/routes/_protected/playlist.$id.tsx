import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  playlistInfoQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { cn } from "@/lib/utils";
import TracksRender from "@/components/playlist/tracks-render";
import { useBackgroundColor } from "@/lib/hooks/useBackgroundColor";
import { useEffect } from "react";
import BackgroundWrapper from "@/page/background-wrapper";
import { getAverageColor } from "@/lib/hooks/getAverageColor";

export const Route = createFileRoute("/_protected/playlist/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/playlist/$id" });
  const { data: playlistInfo } = useQuery(playlistInfoQueryOptions(id));
  const { data: playlistItems } = useQuery(playlistItemsQueryOptions(id));

  const { setColor } = useBackgroundColor();
  useEffect(() => {
    (async () => {
      if (playlistInfo?.images[0]?.url) {
        const avgColor = await getAverageColor(playlistInfo.images[0].url);
        setColor(avgColor);
      }
    })();
  }, [playlistInfo, setColor]);

  if (!playlistInfo || !playlistItems) return <></>;

  return (
    <BackgroundWrapper gradient moving className="flex-col">
      <div className="relative mx-3 mt-8 mb-4 flex w-full justify-center">
        <div className="mx-3 flex w-full max-w-5xl space-x-4">
          <img
            src={playlistInfo.images[0]?.url}
            alt={playlistInfo.name}
            className={cn("h-40 w-40 object-cover shadow-2xl")}
          />
          <div>
            <p>{playlistInfo.public ? "Public" : "Private"}</p>
            <h1 className="text-6xl font-extrabold tracking-wide">
              {playlistInfo.name}
            </h1>
            <div className="text-foreground/60 flex flex-col text-sm">
              <p>{playlistInfo.tracks.total} songs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center bg-black/10 pb-40">
        <div className="mx-3 w-full max-w-5xl justify-center">
          <TracksRender playlistItems={playlistItems} />
        </div>
      </div>
    </BackgroundWrapper>
  );
}
