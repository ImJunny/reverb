import { currentUserPlaylistsQueryOptions } from "@/lib/api-options";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlaylistCard } from "@/components/playlist/playlist-card";

export const Route = createFileRoute("/_protected/playlists")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    ...currentUserPlaylistsQueryOptions,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <BackgroundWrapper
      className="flex-col p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <div className="flex flex-wrap gap-2">
        {data?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </BackgroundWrapper>
  );
}
