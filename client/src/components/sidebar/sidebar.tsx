import { useSidebar } from "@/lib/hooks/useSidebar";
import { sidebarTypes, type SidebarType } from "../providers/sidebar-provider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import ListeningPanel from "./listening-panel";
import QueuePanel from "./queue-panel";
import BookmarksPanel from "./bookmarks-panel";

export default function RightSidebarWrapper() {
  const { type, setType, open } = useSidebar();

  const handleClick = (sidebarType: SidebarType) => {
    setType(sidebarType);
  };

  if (!open) return null;

  return (
    <div className="bg-muted hidden h-full w-full max-w-80 flex-col overflow-hidden rounded-sm lg:flex">
      {/* Header */}
      <div className="text-muted-foreground my-4 grid shrink-0 grid-cols-3 items-center justify-items-center gap-2 px-3 text-sm font-semibold">
        {sidebarTypes.map((sidebarType) => (
          <p
            key={sidebarType}
            className={cn(
              "cursor-pointer",
              type === sidebarType && "text-foreground",
            )}
            onClick={() => handleClick(sidebarType)}
          >
            {sidebarType.charAt(0).toUpperCase() + sidebarType.slice(1)}
          </p>
        ))}
      </div>

      {/* Scrollable content wrapper */}
      <div className="w-full overflow-hidden">
        <ScrollArea className="h-full px-3 pb-3">
          {type === "listening" ? (
            <ListeningPanel />
          ) : type === "queue" ? (
            <QueuePanel />
          ) : type === "bookmarks" ? (
            <BookmarksPanel />
          ) : null}
        </ScrollArea>
      </div>
    </div>
  );
}
