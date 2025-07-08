import Card from "@/components/ui/card";
import { useAudio } from "@/lib/hooks/useAudio";
import { useCreatePost } from "@/lib/hooks/useCreatePost";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { TrackInfoItem } from "shared/types";

export default function SearchTrackSelection({
  field,
}: {
  field: AnyFieldApi;
}) {
  const { audioRef, trackInfo, setTrackInfo, playing, setPlaying } = useAudio();
  const { firstOpen, setOpen, setFirstOpen } = useSidebar();
  const { selectedTrackInfo } = useCreatePost();
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!selectedTrackInfo) return;
    (async () => {
      const temp = await getAverageColor(selectedTrackInfo.image_url);
      setColor(temp);
    })();
  }, [selectedTrackInfo]);

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

  const handleClick = (item: TrackInfoItem) => {
    if (trackInfo?.id === item.id) {
      togglePlayback();
    } else {
      setTrackInfo({
        id: item.id,
        name: item.name,
        artists: item.artists,
        image_url: item.image_url,
      });
    }

    if (firstOpen) {
      setOpen(true);
      setFirstOpen(false);
    }
  };

  return (
    <Card
      className="bg-background mt-3 flex flex-row items-center rounded-xs"
      style={{
        backgroundColor: color
          ? `color-mix(in srgb, ${color} 55%, #000 45%)`
          : undefined,
      }}
    >
      <img
        src={selectedTrackInfo?.image_url || ""}
        alt="Track"
        className="h-16 w-16 rounded-xs object-cover"
      />
      <div className="ml-3 flex flex-col">
        <h3
          className={cn(
            "text-sm",
            field.state.value === trackInfo?.id && "text-rose-500",
          )}
        >
          {selectedTrackInfo?.name}
        </h3>
        <p className="text-muted-foreground text-xs">
          {selectedTrackInfo?.artists.map((artist) => artist).join(", ")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => handleClick(selectedTrackInfo!)}
        className="mr-4 ml-auto"
      >
        {playing && trackInfo?.id === selectedTrackInfo?.id ? (
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
