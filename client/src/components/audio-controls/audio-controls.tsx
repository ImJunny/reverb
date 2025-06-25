import { Pause, Play } from "lucide-react";
import Stage from "../stage/stage";
import { useEffect, useState } from "react";
import { useAudioControls } from "@/lib/hooks/useAudioControls";
import { useQuery } from "@tanstack/react-query";
import { trackPreviewQueryOptions } from "@/lib/api-options";
import { formatDuration } from "@/lib/scripts/formatDuration";

export default function AudioControls() {
  const { audioRef, trackInfo } = useAudioControls();

  const { data: previewData } = useQuery({
    ...trackPreviewQueryOptions(trackInfo.id),
    enabled: !!trackInfo,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
    }
    if (previewData?.link) {
      audioRef.current.src = previewData.link;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [previewData, audioRef]);

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

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  useEffect(() => {
    if (trackInfo.id) {
      setPlaying(true);
    }
  }, [trackInfo]);

  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  return (
    <div className="bg-background relative z-10 mx-2 flex h-20 w-full items-center">
      <Stage />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex w-full max-w-sm items-center overflow-hidden">
          {trackInfo.imageUrl && (
            <img
              src={trackInfo.imageUrl}
              alt="Album cover"
              className="h-13 w-13 flex-shrink-0 rounded-xs object-cover"
            />
          )}
          <div className="ml-3 min-w-0">
            <p className="truncate text-sm">{trackInfo.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {trackInfo.artists.map((artist) => artist).join(", ")}
            </p>
          </div>
        </div>
        <div className="absolute right-0 left-0 mx-auto flex w-full max-w-lg flex-col space-y-1">
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
          <div className="text-muted-foreground flex items-center space-x-3 text-xs">
            <span>{formatDuration(currentTime * 1000)}</span>
            <div className="group bg-primary/20 relative h-[3px] w-full max-w-lg cursor-pointer rounded">
              <div
                className="bg-foreground h-full rounded group-hover:bg-emerald-500"
                style={{
                  width: `${(currentTime / 30) * 100}%`,
                }}
              />

              <div
                className="bg-foreground absolute top-1/2 hidden h-3 w-3 rounded-full group-hover:block"
                style={{
                  left: `${(currentTime / 30) * 100}%`,
                  transform: "translate(-50%, -50%)", // center it horizontally and vertically
                }}
              />
            </div>
            <span>{formatDuration(30000)}</span>
          </div>
        </div>

        <div>Volume</div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
