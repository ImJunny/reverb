import { useAudio } from "@/lib/hooks/useAudio";
import { Pause, Play } from "lucide-react";

export default function PlayToggle() {
  const { audioRef, playing, setPlaying } = useAudio();

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

  return (
    <button
      onClick={togglePlayback}
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
