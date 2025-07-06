import { useAudio } from "@/lib/hooks/useAudio";
import AboutArtist from "./about-artist";
import AboutSong from "./about-song";

export default function ListeningPanel() {
  const { trackInfo } = useAudio();

  if (!trackInfo)
    return (
      <p className="text-muted-foreground text-center text-sm">
        No track is currently playing.
      </p>
    );

  return (
    <div>
      <img
        src={trackInfo.imageUrl}
        alt="album"
        className="aspect-square h-auto w-full rounded-sm"
      />
      <div className="mt-3 mb-5 flex flex-col">
        <h3 className="text-xl font-bold">{trackInfo.name}</h3>
        <p className="text-muted-foreground text-sm">
          {trackInfo.artists.join(", ")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <AboutSong />
        <AboutArtist />
      </div>
    </div>
  );
}
