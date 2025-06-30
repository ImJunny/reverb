import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { Pause, Play, PlusCircle } from "lucide-react";
import { formatDuration } from "@/lib/scripts/formatDuration";
import { useAudio } from "@/lib/hooks/useAudio";

export default function TracksRender({
  items,
  minimal,
}: {
  items: SpotifyApi.PlaylistTrackObject[];
  minimal?: boolean;
}) {
  const { audioRef, trackInfo, setTrackInfo, playing, setPlaying } = useAudio();

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

  const handleClick = (item: SpotifyApi.PlaylistTrackObject) => {
    if (trackInfo.id === item.track!.id) {
      togglePlayback();
    } else {
      setTrackInfo({
        id: item.track!.id,
        name: item.track!.name,
        artists: item.track!.artists.map((artist) => artist.name),
        imageUrl: item.track!.album.images[0]?.url ?? "",
      });
    }
  };

  if (!items) return <></>;

  return (
    <div className="h-full overflow-hidden">
      <div className="mb-3">
        <div className="grid grid-cols-2">
          <div className="text-foreground/70 mt-2 flex space-x-3 px-3 text-xs">
            <div className="flex w-5 items-center justify-center">
              <p>#</p>
            </div>
            <p>Title</p>
          </div>
        </div>
        <Separator className="mt-2" />
      </div>

      <ScrollArea className={cn("h-full", minimal && "max-h-63")}>
        <div className={cn("flex flex-col")}>
          {items.map((item, idx) => (
            <div
              key={item.track!.id}
              className={cn(
                "group hover:bg-foreground/5 flex h-11 items-center space-x-3 rounded-sm px-3",
                minimal && "h-9",
              )}
            >
              <div className="flex w-5 items-center justify-center">
                <button onClick={() => handleClick(item)}>
                  {playing && trackInfo.id === item.track!.id ? (
                    <Pause
                      size={16}
                      className="hover:fill-foreground fill-foreground/70 hidden text-transparent group-hover:block hover:cursor-pointer"
                    />
                  ) : (
                    <Play
                      size={16}
                      className="hover:fill-foreground fill-foreground/70 hidden text-transparent group-hover:block hover:cursor-pointer"
                    />
                  )}
                </button>

                <p
                  className={cn(
                    "text-foreground/70 text-xs font-light group-hover:hidden",
                    trackInfo.id === item.track!.id && "text-rose-500",
                  )}
                >
                  {idx + 1}
                </p>
              </div>

              <img
                src={item.track!.album.images[0]?.url}
                alt="track"
                className={cn(
                  "h-9 w-9 rounded-xs object-cover",
                  minimal && "h-7 w-7",
                )}
              />

              <div
                className={cn(
                  "flex text-xs",
                  minimal ? "flex-row items-center" : "flex-col",
                )}
              >
                <span
                  className={cn(
                    !minimal && "text-sm",
                    trackInfo.id === item.track!.id && "text-rose-500",
                  )}
                >
                  {item.track!.name}
                </span>
                <span className="text-foreground/70 text-xs">
                  {minimal && <span>&nbsp;• </span>}
                  {item.track!.artists.map((artist) => artist.name).join(", ")}
                </span>
              </div>
              <PlusCircle
                size={16}
                className="text-foreground/70 hover:text-foreground mr-4 ml-auto hidden group-hover:block hover:cursor-pointer"
              />
              <span className="text-foreground/70 ml-auto text-xs group-hover:ml-0">
                {formatDuration(item.track!.duration_ms)}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
