import { CircleMinus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

const data: { title: string; artist: string }[] = [
  {
    title: "Mercury",
    artist: "Steve Lacey",
  },
  {
    title: "Pink + White",
    artist: "Frank Ocean",
  },
  {
    title: "Best Part",
    artist: "Daniel Caesar",
  },
  {
    title: "Get You",
    artist: "Daniel Caesar",
  },
  {
    title: "Japanese Denim",
    artist: "Daniel Caesar",
  },
  {
    title: "First Day of My Life",
    artist: "Bright Eyes",
  },
  {
    title: "Holocene",
    artist: "Bon Iver",
  },
  {
    title: "Young Lion",
    artist: "Vampire Weekend",
  },
  {
    title: "New Slang",
    artist: "The Shins",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
  {
    title: "Rivers and Roads",
    artist: "The Head and the Heart",
  },
];

export default function StageSidebar() {
  const [count, setCount] = useState(0);
  const [songs, setSongs] = useState(data);

  return (
    <div className="h-full">
      <h1 className="text-sm">Staged songs</h1>
      <ScrollArea className={cn("bg-muted mt-2 mb-2 flex flex-col")}>
        {songs.length > 0 ? (
          <div>
            {songs.map((song, index) => (
              <div
                key={index}
                className={cn(
                  "group hover:bg-accent flex flex-row items-center gap-2 rounded-sm p-2 pr-4",
                )}
              >
                <div className="h-9 w-9 rounded-xs bg-gray-500 hover:cursor-pointer" />
                <div className="flex flex-col text-xs">
                  <span>{song.title}</span>
                  <span className="text-muted-foreground">{song.artist}</span>
                </div>
                <CircleMinus
                  size={16}
                  className="text-foreground/60 hover:text-foreground mr-2 ml-auto hidden group-hover:block hover:cursor-pointer"
                  onClick={() => {
                    setSongs((prev) => prev.filter((_, i) => i !== index));
                  }}
                />
                <Checkbox
                  className="ml-auto group-hover:ml-0 hover:cursor-pointer"
                  onCheckedChange={(checked) => {
                    setCount((prev) => prev + (checked ? 1 : -1));
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground m-2 text-xs">
            No songs staged yet. You can stage songs you find and save them to
            your own playlists.
          </p>
        )}
      </ScrollArea>
      <Button className="w-full" disabled={count === 0}>
        Save {count} {count == 1 ? "song" : "songs"}
      </Button>
    </div>
  );
}
