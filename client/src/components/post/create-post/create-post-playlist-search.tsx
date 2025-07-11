import {
  SearchFilter,
  SearchFilterInput,
  SearchFilterResultsItem,
  SearchFilterResults,
} from "@/components/search-filter/search-filter";
import { currentUserPlaylistsQueryOptions } from "@/lib/api-options";
import { useQuery } from "@tanstack/react-query";
import type { GeneralPlaylistData } from "shared/types";
import GeneralPlaylistCard from "../general-post/general-playlist-card";
import type { AnyFieldApi } from "@tanstack/react-form";

export default function CreatePostPlaylistSearch({
  field,
  onClick,
}: {
  field?: AnyFieldApi;
  onClick: (id: string) => void;
}) {
  const { data } = useQuery({ ...currentUserPlaylistsQueryOptions });
  // should filter owned playlists through the server, but im lazy so ill do it later
  const playlists = data?.filter((playlist) => playlist.self);

  return (
    <div>
      <SearchFilter data={playlists} searchKey="name">
        <SearchFilterInput placeholder="Search playlist" label="Playlist" />
        <SearchFilterResults<GeneralPlaylistData> className="bg-muted ring-ring/50 max-h-65 ring-1">
          {(result) => (
            <SearchFilterResultsItem
              className="hover:bg-foreground/5 flex items-center space-x-2 p-2"
              key={result.id}
              onClick={() => onClick(result.id)}
            >
              <img
                src={result.image_url}
                alt={result.name}
                className="rounded-xxs h-9 w-9 object-cover"
              />
              <p className="text-sm">{result.name}</p>
            </SearchFilterResultsItem>
          )}
        </SearchFilterResults>
      </SearchFilter>

      {field?.state.value && (
        <GeneralPlaylistCard playlistId={field.state.value} className="mt-3" />
      )}
    </div>
  );
}
