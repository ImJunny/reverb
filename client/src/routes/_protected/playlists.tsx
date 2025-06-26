import Card from "@/components/ui/card";
import { currentUserPlaylistsQueryOptions } from "@/lib/api-options";
import BackgroundWrapper from "@/page/background-wrapper";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/playlists")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(currentUserPlaylistsQueryOptions);
  return (
    <BackgroundWrapper className="flex-col p-3">
      <h1 className="text-lg font-semibold">Your playlists</h1>
      <div className="mt-1 flex space-x-2">
        {data?.items.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </BackgroundWrapper>
  );
}

function PlaylistCard({
  playlist,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}) {
  return (
    <Link to="/playlist/$id" params={{ id: playlist.id }}>
      <Card
        className="hover:bg-card flex cursor-pointer flex-col space-y-2"
        transparent
      >
        {playlist.images[0]?.url ? (
          <img
            src={playlist.images[0].url}
            alt={playlist.name}
            className="aspect-square h-32 w-full rounded-sm object-cover"
          />
        ) : (
          <div className="bg-muted aspect-square h-32 w-full rounded-sm" />
        )}

        <div className="flex flex-col space-y-1">
          <h3 className="text-sm">{playlist.name}</h3>
          <span className="text-muted-foreground text-xs">
            {playlist.tracks.total} songs
          </span>
          <span className="text-muted-foreground text-xs">
            {playlist.public ? "Public" : "Private"}
          </span>
        </div>
      </Card>
    </Link>
  );
}
