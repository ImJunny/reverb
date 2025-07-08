/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { trackPreviewQueryOptions } from "@/lib/api-options";
import PlayToggle from "./play-toggle";
import AudioBar from "./audio-bar";
import { useAudio } from "@/lib/hooks/useAudio";
import { SkipBack, SkipForward } from "lucide-react";
import VolumeBar from "./volume-bar";

export default function AudioControls() {
  const { audioRef, trackInfo, setPlaying, setCurrentTime } = useAudio();
  const queryClient = useQueryClient();

  const { data: previewData } = useQuery({
    ...trackPreviewQueryOptions(trackInfo?.id),
    enabled: !!trackInfo,
    placeholderData: (prev) => prev,
  });

  // Initialize audio element if not already done
  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.1;
      setPlaying(true);
    }

    if (previewData?.audio_src) {
      audioRef.current.src = previewData.audio_src;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [previewData, audioRef]);

  // Pause and reset current time when track changes ONLY if preview is NOT cached
  useEffect(() => {
    if (!trackInfo) return;
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
  }, [trackInfo?.id]);

  // Handle audio track end
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    audioRef.current.addEventListener("ended", handleEnded);
    return () => audioRef.current?.removeEventListener("ended", handleEnded);
  }, [audioRef]);

  return (
    <>
      <audio ref={audioRef} />
      {audioRef.current && trackInfo && (
        <div className="bg-background relative z-10 -mt-2 flex h-20 w-full items-center px-2">
          <div className="relative flex w-full items-center justify-between">
            <div className="flex w-full max-w-sm items-center overflow-hidden">
              {trackInfo.image_url && (
                <img
                  src={trackInfo.image_url}
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

            <div className="absolute right-0 left-0 mx-auto flex w-full max-w-lg flex-col space-y-2">
              <div className="flex items-center space-x-3 self-center">
                <SkipBack className="fill-white" size={16} />
                <PlayToggle />
                <SkipForward className="fill-white" size={16} />
              </div>

              <AudioBar />
            </div>

            <VolumeBar className="mr-1" />
          </div>
        </div>
      )}
    </>
  );
}
