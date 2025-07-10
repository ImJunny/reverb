import BackgroundWrapper from "@/components/page/background-wrapper";
import {
  Search,
  SearchInput,
  SearchResultItem,
  SearchResults,
} from "@/components/search/search";
import { trackSearchQueryOptions } from "@/lib/api-options";
import type { UseQueryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { TrackSearchResult } from "shared/types";

export const Route = createFileRoute("/_protected/explore")({
  component: Explore,
});

function Explore() {
  return (
    <BackgroundWrapper className="flex flex-col p-3">
      <p>Hello from Explore!</p>

      <Search
        queryOptions={
          trackSearchQueryOptions as (query: string) => UseQueryOptions
        }
      >
        <SearchInput />
        <SearchResults<TrackSearchResult> className="absolute z-1 bg-black">
          {(result, idx) => (
            <SearchResultItem key={idx} className="flex items-center space-x-2">
              <img
                src={result.image_url}
                alt="track"
                className="h-9 w-9 rounded-xs object-cover"
              />
              <p>{result.name}</p>
            </SearchResultItem>
          )}
        </SearchResults>
      </Search>
    </BackgroundWrapper>
  );
}
