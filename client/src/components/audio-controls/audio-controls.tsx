import { Play } from "lucide-react";
import Stage from "../stage/stage";
import { useEffect, useRef } from "react";
import { useAudioControls } from "@/lib/hooks/useAudioControls";

export default function AudioControls() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { url: audioUrl } = useAudioControls();

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio();
    }
    if (audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  }, [audioUrl]);

  const handleClick = () => {
    if (audioRef.current === null) return;
    if (audioRef.current.paused && audioUrl) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="bg-background relative z-10 mx-2 flex h-20 w-full items-center">
      <Stage />

      <div className="h-13 w-13 rounded-xs bg-blue-100" />
      <div className="ml-3">
        <p className="text-sm">Hello there</p>
        <p className="text-muted-foreground text-xs">James Smith</p>
      </div>
      <div>
        <Play onClick={handleClick} />
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
