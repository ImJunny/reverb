import { useSidebar } from "@/lib/hooks/useSidebar";
import { sidebarTypes, type SidebarType } from "./sidebar-provider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import ListeningPanel from "./listening-panel/listening-panel";
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
      <div className="text-muted-foreground mt-3 mb-3 flex shrink-0 items-center px-3 text-xs font-semibold">
        {sidebarTypes.map((sidebarType) => (
          <p
            key={sidebarType}
            className={cn(
              "flex cursor-pointer items-center p-3 decoration-rose-500 transition-colors duration-100 hover:bg-white/10",
              type === sidebarType &&
                "text-foreground underline decoration-3 underline-offset-10",
            )}
            onClick={() => handleClick(sidebarType)}
          >
            {sidebarType.charAt(0).toUpperCase() + sidebarType.slice(1)}
          </p>
        ))}
      </div>

      {/* Scrollable content wrapper */}
      <div className="w-full overflow-hidden">
        <ScrollArea className="h-full px-3">
          <div className="mb-3">
            {type === "listening" ? (
              <ListeningPanel />
            ) : type === "queue" ? (
              <QueuePanel />
            ) : type === "bookmarks" ? (
              <BookmarksPanel />
            ) : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
