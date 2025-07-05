import { currentUserPlaylistsQueryOptions } from "@/lib/api-options";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlaylistCard } from "@/components/playlist/playlist-card";

export const Route = createFileRoute("/_protected/playlists")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(currentUserPlaylistsQueryOptions);
  return (
    <BackgroundWrapper
      className="flex-col p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <h1 className="text-lg font-semibold">Your playlists</h1>
      <div className="mt-1 flex flex-wrap gap-2">
        {data?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </BackgroundWrapper>
  );
}
