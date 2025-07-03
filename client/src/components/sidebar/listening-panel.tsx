import { artistDataFromTrackIdQueryOptions } from "@/lib/api-options";
import { useAudio } from "@/lib/hooks/useAudio";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function ListeningPanel() {
  const { trackInfo } = useAudio();

  const { data, isLoading, refetch } = useQuery({
    ...artistDataFromTrackIdQueryOptions(trackInfo?.id),
    enabled: !!trackInfo,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (!trackInfo) return;
    refetch();
  }, [trackInfo, refetch]);

  if (!trackInfo)
    return (
      <p className="text-muted-foreground text-center text-sm">
        No track is currently playing.
      </p>
    );

  return (
    <div>
      <img
        src={trackInfo.imageUrl}
        alt="album"
        className="aspect-square h-auto w-full rounded-sm"
      />
      <div className="mt-3 mb-5 flex flex-col">
        <h3 className="text-xl font-bold">{trackInfo.name}</h3>
        <p className="text-muted-foreground text-sm">
          {trackInfo.artists.join(", ")}
        </p>
      </div>

      {isLoading || !data ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-30 w-full rounded-sm" />
          <Skeleton className="h-50 w-full rounded-sm" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="bg-foreground/8 rounded-sm p-3">
            <div className="mb-2 flex items-center gap-2">
              <h4 className="text-sm font-semibold">About the song</h4>
              <Badge variant="outline" className="h-4 px-1">
                AI
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="bg-foreground/8 overflow-hidden rounded-sm">
            <div className="relative">
              <img
                src={data.image_url}
                alt={data.name}
                className="h-50 w-full object-cover shadow-inner"
              />
              <div className="pointer-events-none absolute -top-1 h-20 w-full bg-gradient-to-b from-black/80 to-transparent" />
              <div className="absolute top-3 left-3 mb-2 flex items-center gap-2">
                <h4 className="text-sm font-semibold">About the artist</h4>
                <Badge variant="outline" className="h-4 px-1">
                  AI
                </Badge>
              </div>
            </div>

            <div className="p-3">
              <h4 className="mb-2 text-sm font-semibold">{data.name}</h4>

              <p className="text-muted-foreground text-xs">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
