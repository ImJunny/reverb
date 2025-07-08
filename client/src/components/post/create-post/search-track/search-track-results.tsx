import { useCreatePost } from "@/lib/hooks/useCreatePost";
import { cn } from "@/lib/utils";
import type { TrackSearchResult } from "shared/types";

export default function SearchTrackResults({
  items,
  onSelect,
}: {
  items: TrackSearchResult[];
  onSelect?: (id: string) => void;
}) {
  const { setSelectedTrackInfo } = useCreatePost();

  const handleClick = (id: string) => {
    onSelect?.(id);
    setSelectedTrackInfo?.({
      id,
      image_url: items.find((item) => item.id === id)?.image_url || "",
      name: items.find((item) => item.id === id)?.name || "",
      artists:
        items
          .find((item) => item.id === id)
          ?.artists.map((artist) => artist.name) || [],
    });
  };

  if (!items) return <></>;

  return (
    <div className="h-full overflow-hidden">
      <div className={cn("flex flex-col")}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "group hover:bg-foreground/5 flex items-center space-x-2 rounded-sm p-2",
            )}
            onClick={() => handleClick(item.id)}
          >
            <img
              src={item.image_url}
              alt="track"
              className={cn("h-9 w-9 rounded-xs object-cover")}
            />

            <div className="flex flex-col text-xs">
              <span className={"text-sm"}>{item.name}</span>
              <span className="text-muted-foreground text-xs">
                {item.artists.map((artist) => artist.name).join(", ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
