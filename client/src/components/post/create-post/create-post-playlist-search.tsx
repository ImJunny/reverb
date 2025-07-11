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
import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <SearchFilter
        data={playlists}
        searchKey="name"
        className={cn(
          field?.state.value && "pointer-events-none h-0 opacity-0",
        )}
      >
        <SearchFilterInput placeholder="Search playlist" ref={inputRef} />
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
        <GeneralPlaylistCard playlistId={field.state.value}>
          <div className="flex items-center">
            <button
              onClick={() => {
                field.handleChange(undefined);
                inputRef.current?.focus();
              }}
              className="mr-3"
            >
              <p className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
                Change
              </p>
            </button>
          </div>
        </GeneralPlaylistCard>
      )}
    </div>
  );
}
