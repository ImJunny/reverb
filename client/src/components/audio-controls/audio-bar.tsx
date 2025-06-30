/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useCallback, useState, useEffect } from "react";
import { useAudio } from "@/lib/hooks/useAudio";
import { formatDuration } from "@/lib/scripts/formatDuration";
import { cn } from "@/lib/utils";

export default function AudioBar() {
  const { audioRef, currentTime, setCurrentTime } = useAudio();
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0)
        setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () =>
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [audioRef]);

  // Update current time as the audio plays
  useEffect(() => {
    if (!audioRef.current) return;
    const handleTimeUpdate = () =>
      setCurrentTime(audioRef.current!.currentTime);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () =>
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
  }, [audioRef]);

  // Function to seek to a specific time in the audio
  const seek = useCallback(
    (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
      if (!audioRef.current || !barRef.current) return;

      const rect = barRef.current.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0]!.clientX : (e as MouseEvent).clientX;

      const offsetX = Math.min(Math.max(0, clientX - rect.left), rect.width);
      const percentage = offsetX / rect.width;
      const newTime = percentage * duration;

      audioRef.current.currentTime = newTime;
    },
    [audioRef, duration],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seek(e);
    window.addEventListener("mousemove", seek as EventListener);
    window.addEventListener("mouseup", stopDrag);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seek(e);
    window.addEventListener("touchmove", seek as EventListener);
    window.addEventListener("touchend", stopDrag);
  };

  const stopDrag = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", seek as EventListener);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", seek as EventListener);
    window.removeEventListener("touchend", stopDrag);
  };

  const percent = (currentTime / duration) * 100;

  return (
    <div className="text-muted-foreground flex items-center space-x-3 text-xs">
      <span>{formatDuration(currentTime * 1000)}</span>
      <div
        ref={barRef}
        className="group bg-primary/20 relative h-[3px] w-full max-w-lg cursor-pointer rounded"
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
      <span>{formatDuration(duration * 1000)}</span>
    </div>
  );
}
