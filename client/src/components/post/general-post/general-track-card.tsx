import Card from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trackDataQueryOptions } from "@/lib/api-options";
import { useAudio } from "@/lib/hooks/useAudio";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { Track } from "shared/types";

export default function GeneralTrackCard({ trackId }: { trackId: string }) {
  const { data: trackData, isFetching } = useQuery(
    trackDataQueryOptions(trackId),
  );

  const { audioRef, trackInfo, setTrackInfo, playing, setPlaying } = useAudio();
  const { firstOpen, setOpen, setFirstOpen } = useSidebar();
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!trackData) return;
    (async () => {
      const temp = await getAverageColor(trackData.album.image_url);
      setColor(temp);
    })();
  }, [trackData]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleClick = (item: Track) => {
    if (trackInfo?.id === item.id) {
      togglePlayback();
    } else {
      setTrackInfo({
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        image_url: item.album.image_url,
      });
    }

    if (firstOpen) {
      setOpen(true);
      setFirstOpen(false);
    }
  };

  if (isFetching) {
    return <Skeleton className="h-22 w-full rounded-xs" />;
  }

  return (
    <Card
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="bg-background flex cursor-default flex-row rounded-xs shadow-lg ring-2 ring-black/5"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 55%, #000 45%)`
          : undefined,
      }}
    >
      <img
        src={trackData?.album.image_url || ""}
        alt="Track"
        className="h-16 w-16 rounded-xs object-cover shadow-md"
      />
      <div className="ml-3 flex flex-1 flex-col">
        <p className="text-muted-foreground text-xs">Song</p>
        <h3 className={cn("mt-auto text-sm font-semibold")}>
          {trackData?.name}
        </h3>
        <p className="text-muted-foreground text-xs">
          {trackData?.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => handleClick(trackData!)}
        className="mr-4 ml-auto"
      >
        {playing && trackInfo?.id === trackData?.id ? (
          <Pause
            size={24}
            className="hover:fill-foreground fill-muted-foreground stroke-none hover:cursor-pointer"
          />
        ) : (
          <Play
            size={24}
            className="hover:fill-foreground fill-muted-foreground stroke-none hover:cursor-pointer"
          />
        )}
      </button>
    </Card>
  );
}
