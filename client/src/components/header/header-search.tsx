import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import {
  Search,
  SearchInput,
  SearchResultsItem,
  SearchResults,
} from "../search/search";
import { trackSearchQueryOptions } from "@/lib/api-options";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { TrackSearchResult } from "shared/types";

export default function HeaderSearch() {
  return (
    <Search
      queryOptions={
        trackSearchQueryOptions as (query: string) => UseQueryOptions
      }
      className="mx-auto w-full max-w-lg"
    >
      <SearchBar>
        <SearchInput
          placeholder="Search songs, users, posts..."
          className="placeholder:text-muted-foreground flex w-full bg-transparent text-sm focus:outline-none focus-visible:bg-transparent focus-visible:ring-0"
          hideLabel
        />
      </SearchBar>
      <SearchResults<TrackSearchResult> className="bg-popover mt-2 rounded-xs">
        {(result) => (
          <SearchResultsItem className="hover:bg-foreground/5 flex items-center space-x-2 p-2">
            <img
              src={result.image_url}
              alt="track"
              className={cn("h-9 w-9 object-cover")}
            />

            <div className="flex flex-col text-xs">
              <span className={"text-sm"}>{result.name}</span>
              <span className="text-muted-foreground text-xs">
                {result.artists.map((artist) => artist.name).join(", ")}
              </span>
            </div>
          </SearchResultsItem>
        )}
      </SearchResults>
    </Search>
  );
}

function SearchBar({ children }: { children: ReactNode }) {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={cn(
        "bg-accent mx-auto flex h-9 w-full items-center rounded-full p-2 px-3 transition-all duration-200 hover:bg-white/20",
        focused && "ring-foreground ring-2",
      )}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <SearchIcon className="text-muted-foreground shrink-0" size={20} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
