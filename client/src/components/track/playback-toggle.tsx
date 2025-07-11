import { useAudio } from "@/lib/hooks/useAudio";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { Pause, Play, type LucideProps } from "lucide-react";
import type { Track } from "shared/types";

type PlaybackToggleProps = {
  trackData: Track;
} & LucideProps;

export default function PlaybackToggle({
  trackData,
  className,
  ...props
}: PlaybackToggleProps) {
  const { audioRef, trackInfo, setTrackInfo, playing, setPlaying } = useAudio();
  const { firstOpen, setOpen, setFirstOpen } = useSidebar();

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

  return (
    <button type="button" onClick={() => handleClick(trackData)}>
      {playing && trackInfo?.id === trackData?.id ? (
        <Pause
          size={16}
          className={cn(
            "hover:fill-foreground fill-muted-foreground cursor-pointer stroke-none",
            className,
          )}
          {...props}
        />
      ) : (
        <Play
          size={16}
          className={cn(
            "hover:fill-foreground fill-muted-foreground cursor-pointer stroke-none",
            className,
          )}
          {...props}
        />
      )}
    </button>
  );
}
