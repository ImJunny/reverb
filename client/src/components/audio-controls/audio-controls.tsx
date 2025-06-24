import { Play } from "lucide-react";
import Stage from "../stage/stage";
import { useEffect } from "react";
import { useAudioControls } from "@/lib/hooks/useAudioControls";
import { useQuery } from "@tanstack/react-query";
import { trackPreviewQueryOptions } from "@/lib/api-options";

export default function AudioControls() {
  const { trackId, audioRef } = useAudioControls();

  const { data: trackData } = useQuery({
    ...trackPreviewQueryOptions(trackId),
    enabled: !!trackId,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
    }
    if (trackData?.link) {
      audioRef.current.src = trackData.link;
      audioRef.current.play();
    }
  }, [trackData, audioRef]);

  const handleClick = () => {
    if (audioRef.current === null) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="bg-background relative z-10 mx-2 flex h-20 w-full items-center">
      <Stage />

      {trackData?.base.album.images[0]?.url && (
        <img
          src={trackData?.base.album.images[0]?.url}
          alt="Album cover"
          className="h-13 w-13 rounded-xs object-cover"
        />
      )}

      <div className="ml-3">
        <p className="text-sm">{trackData?.base.name}</p>
        <p className="text-muted-foreground text-xs">
          {trackData?.base.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
      <div>
        <Play onClick={handleClick} />
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
