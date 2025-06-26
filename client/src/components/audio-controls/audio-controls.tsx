/* eslint-disable react-hooks/exhaustive-deps */
import Stage from "../stage/stage";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trackPreviewQueryOptions } from "@/lib/api-options";
import PlayToggle from "./play-toggle";
import AudioBar from "./audio-bar";
import { useAudio } from "@/lib/hooks/useAudio";

export default function AudioControls() {
  const { audioRef, trackInfo } = useAudio();
  const queryClient = useQueryClient();

  const { data: previewData } = useQuery({
    ...trackPreviewQueryOptions(trackInfo.id),
    enabled: !!trackInfo,
    placeholderData: (prev) => prev,
  });

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize audio element if not already done
  useEffect(() => {
    if (audioRef.current === null) audioRef.current = new Audio();

    if (previewData?.link) {
      audioRef.current.src = previewData.link;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [previewData, audioRef]);

  // Pause and reset current time when track changes ONLY if preview is NOT cached
  useEffect(() => {
    if (!trackInfo.id) return;
    const cachedPreview = queryClient.getQueryData(
      trackPreviewQueryOptions(trackInfo.id).queryKey,
    );

    if (!cachedPreview) {
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [trackInfo.id]);

  // Handle audio playback toggle
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

  // Update current time as the audio plays
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
          <PlayToggle playing={playing} setPlaying={setPlaying} />
          <AudioBar currentTime={currentTime} />
        </div>

        <div>Volume</div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
