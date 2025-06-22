import { ChevronUp, CircleMinus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
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
];

export default function Stage() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [songs, setSongs] = useState(data);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="absolute right-0 bottom-20 mr-6"
    >
      <CollapsibleTrigger>
        <div className="bg-card flex w-72 items-center rounded-t-sm px-3 py-2 text-sm">
          <span>Staged Songs</span>
          <span className="text-muted-foreground">&nbsp;• {songs.length}</span>
          <ChevronUp
            className={cn(
              "ml-auto transition-all duration-300",
              open && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-card w-72 px-3 pb-2">
          <ScrollArea
            className={cn(
              "bg-background-variant mb-2 flex h-91 flex-col overflow-hidden rounded-sm",
            )}
          >
            {songs.length > 0 ? (
              <div>
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group hover:bg-accent flex flex-row items-center gap-2 p-2 pr-4",
                    )}
                  >
                    <div className="bg-muted h-9 w-9 rounded-xs hover:cursor-pointer" />
                    <div className="flex flex-col text-xs">
                      <span>{song.title}</span>
                      <span className="text-muted-foreground">
                        {song.artist}
                      </span>
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
                No songs staged yet. You can stage songs you find and save them
                to your own playlists.
              </p>
            )}
          </ScrollArea>
          <Button className="w-full" disabled={count === 0}>
            Save {count} {count == 1 ? "song" : "songs"}
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
