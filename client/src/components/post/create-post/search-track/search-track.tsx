import { Input } from "../../../ui/input";
import { useQuery } from "@tanstack/react-query";
import { trackSearchQueryOptions } from "@/lib/api-options";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import SearchTrackResults from "./search-track-results";
import type { AnyFieldApi } from "@tanstack/react-form";
import SearchTrackSelection from "./search-track-selection";
import { useCreatePost } from "@/lib/hooks/useCreatePost";

export default function SearchTrack({
  field,
  onSelect,
}: {
  field: AnyFieldApi;
  onSelect: (id: string) => void;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedTrackInfo } = useCreatePost();

  const query = useDebounce(searchInput, 400);
  const { data, isFetched } = useQuery({
    ...trackSearchQueryOptions(query),
    enabled: !!query,
  });

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        placeholder="Search song, artist, album..."
        label="Search"
        value={searchInput}
        onFocus={() => setShowResults(true)}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setShowResults(true);
        }}
      />

      {isFetched && showResults && (
        <div className="bg-popover border-border absolute z-50 w-full rounded-xs rounded-t-none border p-2 shadow-md">
          <SearchTrackResults
            items={data ?? []}
            onSelect={(id) => {
              onSelect(id);
              setShowResults(false);
            }}
          />
        </div>
      )}

      {field.state.value && selectedTrackInfo && (
        <SearchTrackSelection field={field} />
      )}
    </div>
  );
}
