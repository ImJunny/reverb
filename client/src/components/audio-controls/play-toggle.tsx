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
      className="cursor-pointer self-center rounded-full"
    >
      {playing ? (
        <Pause className="fill-white stroke-0" size={28} />
      ) : (
        <Play className="fill-white stroke-0" size={28} />
      )}
    </button>
  );
}
