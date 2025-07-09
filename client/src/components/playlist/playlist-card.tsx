import { Link } from "@tanstack/react-router";
import Card from "../ui/card";
import type { GeneralPlaylistData } from "shared/types";

export function PlaylistCard({ playlist }: { playlist: GeneralPlaylistData }) {
  return (
    <Link to="/playlist/$id" params={{ id: playlist.id }} className="shrink-0">
      <Card
        className="hover:bg-card flex cursor-pointer flex-col space-y-2 rounded-xs"
        transparent
      >
        {playlist.image_url ? (
          <img
            src={playlist.image_url}
            alt={playlist.name}
            className="aspect-square h-32 w-full rounded-sm object-cover"
          />
        ) : (
          <div className="bg-muted aspect-square h-32 w-full rounded-sm" />
        )}

        <div className="flex flex-col space-y-1">
          <h3 className="text-sm">{playlist.name}</h3>
          <span className="text-muted-foreground text-xs">
            {playlist.total} songs
          </span>
          <span className="text-muted-foreground text-xs">
            {playlist.public ? "Public" : "Private"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
