import { type UseQueryOptions } from "@tanstack/react-query";
import { trackSearchQueryOptions } from "@/lib/api-options";
import type { AnyFieldApi } from "@tanstack/react-form";
import SearchTrackSelection from "./search-track-selection";
import {
  Search,
  SearchInput,
  SearchResultItem,
  SearchResults,
} from "@/components/search/search";
import type { TrackSearchResult } from "shared/types";
import { useCreatePost } from "@/lib/hooks/useCreatePost";
import { cn } from "@/lib/utils";

export default function SearchTrack({
  field,
  onClick,
}: {
  field: AnyFieldApi;
  onClick: (id: string) => void;
}) {
  const { setSelectedTrackInfo } = useCreatePost();

  const handleClick = (result: TrackSearchResult) => {
    onClick?.(result.id);
    setSelectedTrackInfo?.({
      id: result.id,
      image_url: result.image_url,
      name: result.name,
      artists: result.artists.map((artist) => artist.name),
    });
  };

  return (
    <div>
      <Search
        queryOptions={
          trackSearchQueryOptions as (query: string) => UseQueryOptions
        }
      >
        <SearchInput
          placeholder="Search song, artist, album..."
          label="Search"
        />
        <SearchResults<TrackSearchResult> className="bg-muted ring-ring/50 ring-1">
          {(result) =>
            (
              <SearchResultItem onClick={() => handleClick(result)}>
                <img
                  src={result.image_url}
                  alt="track"
                  className={cn("rounded-xxs h-9 w-9 object-cover")}
                />

                <div className="flex flex-col text-xs">
                  <span className={"text-sm"}>{result.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {result.artists.map((artist) => artist.name).join(", ")}
                  </span>
                </div>
              </SearchResultItem>
            ) as React.ReactNode
          }
        </SearchResults>
      </Search>

      {field.state.value && <SearchTrackSelection field={field} />}
    </div>
  );
}
