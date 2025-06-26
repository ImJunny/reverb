import { useAudio } from "@/lib/hooks/useAudio";
import { Pause, Play } from "lucide-react";

export default function PlayToggle({
  playing,
  setPlaying,
}: {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}) {
  const { audioRef } = useAudio();

  const handleClick = () => {
    if (audioRef.current === null) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-foreground cursor-pointer self-center rounded-full p-2"
    >
      {playing ? (
        <Pause className="fill-background stroke-0" size={16} />
      ) : (
        <Play className="fill-background stroke-0" size={16} />
      )}
    </button>
  );
}
