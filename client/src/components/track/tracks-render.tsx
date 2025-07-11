import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { ListPlus, Plus, PlusCircle, User } from "lucide-react";
import { formatDuration } from "@/lib/scripts/formatDuration";
import { useAudio } from "@/lib/hooks/useAudio";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Track } from "shared/types";
import PlaybackToggle from "./playback-toggle";

export default function TracksRender({
  items,
  minimal,
  children,
}: {
  items: Track[];
  minimal?: boolean;
  children?: React.ReactNode;
}) {
  const { trackInfo } = useAudio();

  if (!items) return <></>;

  return (
    <div className="h-full overflow-hidden">
      <div className="mb-3">
        <div className="grid grid-cols-2">
          <div className="text-muted-foreground mt-2 flex space-x-3 px-3 text-xs">
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
            <ContextMenu key={item.id}>
              <ContextMenuTrigger>
                <div
                  className={cn(
                    "group hover:bg-foreground/5 flex h-11 items-center space-x-3 rounded-sm px-3",
                    minimal && "h-9",
                  )}
                >
                  <div className="flex w-5 items-center justify-center">
                    <PlaybackToggle
                      trackData={item}
                      size={16}
                      className="hover:fill-foreground fill-muted-foreground hidden text-transparent group-hover:block hover:cursor-pointer"
                    />
                    <p
                      className={cn(
                        "text-muted-foreground text-xs font-light group-hover:hidden",
                        trackInfo?.id === item.id && "text-rose-500",
                      )}
                    >
                      {idx + 1}
                    </p>
                  </div>

                  <img
                    src={item.album.image_url}
                    alt="track"
                    className={cn(
                      "rounded-xxs h-9 w-9 object-cover",
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
                        trackInfo?.id === item.id && "text-rose-500",
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {minimal && <span>&nbsp;• </span>}
                      {item.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>

                  {children}

                  <PlusCircle
                    size={16}
                    className="text-muted-foreground hover:text-foreground mr-4 ml-auto hidden group-hover:block hover:cursor-pointer"
                  />
                  <span className="text-muted-foreground ml-auto text-xs group-hover:ml-0">
                    {formatDuration(item.duration_ms)}
                  </span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="rounded-xxs border-none shadow-lg">
                <ContextMenuItem>
                  <Plus />
                  Add to playlist
                </ContextMenuItem>
                <ContextMenuItem>
                  <PlusCircle />
                  Save to your Liked Songs
                </ContextMenuItem>
                <ContextMenuItem>
                  <ListPlus />
                  Add to queue
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>
                  <User />
                  Go to artist
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// export function TracksRenderTrack({
//   item,
//   idx,
// }: {
//   item: PlaylistItem;
//   idx: number;
// }) {
//   const { audioRef, trackInfo, setTrackInfo, playing, setPlaying } = useAudio();
//   const { firstOpen, setOpen, setFirstOpen } = useSidebar();
//   const togglePlayback = () => {
//     if (!audioRef.current) return;

//     if (playing) {
//       audioRef.current.pause();
//       setPlaying(false);
//     } else {
//       audioRef.current.play();
//       setPlaying(true);
//     }
//   };

//   const handleClick = (item: PlaylistItem) => {
//     if (trackInfo?.id === item.id) {
//       togglePlayback();
//     } else {
//       setTrackInfo({
//         id: item.id,
//         name: item.name,
//         artists: item.artists.map((artist) => artist.name),
//         image_url: item.album.image_url,
//       });
//     }

//     if (firstOpen) {
//       setOpen(true);
//       setFirstOpen(false);
//     }
//   };

//   return (
//     <div className="flex w-full flex-row gap-x-4">
//       <div className="flex w-5 items-center justify-center">
//         <button onClick={() => handleClick(item)}>
//           {playing && trackInfo?.id === item.id ? (
//             <Pause
//               size={16}
//               className="hover:fill-foreground fill-muted-foreground hidden text-transparent group-hover:block hover:cursor-pointer"
//             />
//           ) : (
//             <Play
//               size={16}
//               className="hover:fill-foreground fill-muted-foreground hidden text-transparent group-hover:block hover:cursor-pointer"
//             />
//           )}
//         </button>

//         <p
//           className={cn(
//             "text-muted-foreground text-xs font-light group-hover:hidden",
//             trackInfo?.id === item.id && "text-rose-500",
//           )}
//         >
//           {idx + 1}
//         </p>
//       </div>

//       <img
//         src={item.album.image_url}
//         alt="track"
//         className="rounded-xxs h-9 w-9 object-cover"
//       />

//       <div className="flex w-full flex-col overflow-hidden text-xs">
//         <span
//           className={cn(
//             "truncate",
//             trackInfo?.id === item.id && "text-rose-500",
//           )}
//         >
//           {item.name}
//         </span>
//         <span className="text-muted-foreground truncate text-xs">
//           {item.artists.map((artist) => artist.name).join(", ")}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default function TracksRender({ items }: { items: PlaylistItem[] }) {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//   const headers = [
//     {
//       name: "title",
//       label: "Title",
//       defaultSize: 33,
//       minSize: 20,
//     },
//     {
//       name: "album",
//       label: "Album",
//       defaultSize: 33,
//       minSize: 20,
//     },
//     {
//       name: "duration",
//       label: "Duration",
//       defaultSize: 10,
//       maxSize: 20,
//       minSize: 10,
//     },
//   ];

//   const [headerHovered, setHeaderHovered] = useState(false);

//   return (
//     <ResizablePanelGroup
//       direction="horizontal"
//       className="relative w-full items-start"
//     >
//       {headers.map((header, i) => (
//         <Fragment key={i}>
//           <ResizablePanel
//             className="overflow-hidden"
//             maxSize={header.maxSize}
//             defaultSize={header.defaultSize}
//             minSize={header.minSize}
//           >
//             <div className="flex flex-col">
//               <p
//                 className="text-muted-foreground my-1 ml-2 text-xs capitalize"
//                 onMouseEnter={() => setHeaderHovered(true)}
//                 onMouseLeave={() => setHeaderHovered(false)}
//               >
//                 {header.label}
//               </p>
//               <Separator className="mb-2" />
//               {items.map((item, idx) => {
//                 const isHovered = hoveredIndex === idx;
//                 return (
//                   <div
//                     key={idx}
//                     className={cn(
//                       "group flex h-11 items-center px-2",
//                       isHovered && "bg-white/10",
//                     )}
//                     onMouseEnter={() => setHoveredIndex(idx)}
//                     onMouseLeave={() => setHoveredIndex(null)}
//                   >
//                     {header.name === "title" && (
//                       <TracksRenderTrack item={item} idx={idx} />
//                     )}
//                     {header.name === "album" && (
//                       <p className="text-muted-foreground truncate text-xs">
//                         {item.album.name}
//                       </p>
//                     )}
//                     {header.name === "duration" && (
//                       <div className="flex w-full justify-end">
//                         <PlusCircle
//                           size={16}
//                           className={cn(
//                             "text-muted-foreground hover:text-foreground mr-4 hidden hover:cursor-pointer",
//                             isHovered && "block",
//                           )}
//                         />
//                         <span className="text-muted-foreground text-xs">
//                           {formatDuration(item.duration_ms)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </ResizablePanel>

//           {i < headers.length - 1 && (
//             <ResizableHandle
//               withHandle
//               className={cn("hidden w-0", headerHovered && "block")}
//               onMouseEnter={() => setHeaderHovered(true)}
//               onMouseLeave={() => setHeaderHovered(false)}
//             />
//           )}
//         </Fragment>
//       ))}
//     </ResizablePanelGroup>
//   );
// }
