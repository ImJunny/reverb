import { type UseQueryOptions } from "@tanstack/react-query";
import { trackSearchQueryOptions } from "@/lib/api-options";
import type { AnyFieldApi } from "@tanstack/react-form";
import {
  Search,
  SearchInput,
  SearchResultsItem,
  SearchResults,
} from "@/components/search/search";
import type { TrackSearchResult } from "shared/types";
import { cn } from "@/lib/utils";
import GeneralTrackCard from "../general-post/general-track-card";
import { useRef } from "react";
import PlaybackToggle from "@/components/track/playback-toggle";

export default function CreatePostTrackSearch({
  field,
  onClick,
}: {
  field?: AnyFieldApi;
  onClick: (id: string) => void;
}) {
  const handleClick = (result: TrackSearchResult) => {
    onClick(result.id);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Search
        queryOptions={
          trackSearchQueryOptions as (query: string) => UseQueryOptions
        }
        className={cn(
          field?.state.value && "pointer-events-none h-0 opacity-0",
        )}
      >
        <SearchInput placeholder="Search song" ref={inputRef} />
        <SearchResults<TrackSearchResult> className="bg-muted ring-ring/50 ring-1">
          {(result) =>
            (
              <SearchResultsItem
                onClick={() => handleClick(result)}
                className="hover:bg-foreground/5 flex items-center space-x-2 p-2"
                clearInput
              >
                <img
                  src={result.image_url}
                  alt="track"
                  className={cn("rounded-xxs h-9 w-9 object-cover")}
                />
                <div className="flex flex-col text-xs">
                  <span className="text-sm">{result.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {result.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </SearchResultsItem>
            ) as React.ReactNode
          }
        </SearchResults>
      </Search>

      {field?.state.value && (
        <div className="flex flex-col space-y-2">
          <GeneralTrackCard trackId={field.state.value}>
            {(trackData) => (
              <div className="mr-3 ml-auto flex items-center space-x-3">
                <PlaybackToggle trackData={trackData!} size={24} />
                <button
                  onClick={() => {
                    field.handleChange(undefined);
                    inputRef.current?.focus();
                  }}
                >
                  <p className="text-muted-foreground hover:text-foreground cursor-pointer text-xs">
                    Change
                  </p>
                </button>
              </div>
            )}
          </GeneralTrackCard>
        </div>
      )}
    </div>
  );
}
