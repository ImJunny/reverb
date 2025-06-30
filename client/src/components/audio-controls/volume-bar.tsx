import { useRef, useState, useCallback, useEffect } from "react";
import { useAudio } from "@/lib/hooks/useAudio";
import { cn } from "@/lib/utils";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";

export default function VolumeBar() {
  const { audioRef } = useAudio();
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const [storedVolume, setStoredVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVolumeChange = () => {
      setVolume(audio.volume);
      if (audio.volume > 0) {
        setStoredVolume(audio.volume);
      }
    };

    audio.addEventListener("volumechange", handleVolumeChange);
    return () => {
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [audioRef]);

  const updateVolume = useCallback(
    (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
      if (!audioRef.current || !barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0]!.clientX : (e as MouseEvent).clientX;

      const offsetX = Math.min(Math.max(0, clientX - rect.left), rect.width);
      const percent = offsetX / rect.width;

      audioRef.current.volume = percent;
    },
    [audioRef],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e);
    window.addEventListener("mousemove", updateVolume as EventListener);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e);
    window.addEventListener("touchmove", updateVolume as EventListener);
    window.addEventListener("touchend", stopDrag);
  };

  const stopDrag = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", updateVolume as EventListener);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", updateVolume as EventListener);
    window.removeEventListener("touchend", stopDrag);
  };

  const percent = volume * 100;

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.volume === 0) {
      audioRef.current.volume = storedVolume || 1;
    } else {
      setStoredVolume(audioRef.current.volume);
      audioRef.current.volume = 0;
    }
  };

  return (
    <div className="text-muted-foreground flex items-center space-x-3 text-xs">
      <button
        onClick={toggleMute}
        className="text-muted-foreground hover:text-foreground cursor-pointer"
      >
        {volume === 0 ? (
          <VolumeOff size={16} />
        ) : volume < 0.33 ? (
          <Volume size={16} />
        ) : volume < 0.66 ? (
          <Volume1 size={16} />
        ) : (
          <Volume2 size={16} />
        )}
      </button>
      <div
        ref={barRef}
        className="group bg-primary/20 relative h-[3px] w-24 cursor-pointer rounded"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={cn(
            "bg-foreground h-full rounded group-hover:bg-rose-500",
            isDragging && "bg-rose-500",
          )}
          style={{ width: `${percent}%` }}
        />
        <div
          className={cn(
            "bg-foreground absolute top-1/2 hidden h-3 w-3 rounded-full group-hover:block",
            isDragging && percent > 0 && "block",
          )}
          style={{
            left: `${percent}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
