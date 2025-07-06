import { Badge } from "@/components/ui/badge";
import { useAudio } from "@/lib/hooks/useAudio";
import {
  artistDataFromTrackIdQueryOptions,
  artistSummaryQueryOptions,
} from "@/lib/api-options";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutArtist() {
  const { trackInfo } = useAudio();

  const { data: artistData } = useQuery({
    ...artistDataFromTrackIdQueryOptions(trackInfo?.id),
  });

  const { data: summaryData } = useQuery({
    ...artistSummaryQueryOptions(
      trackInfo?.name,
      artistData?.id,
      artistData?.name,
    ),
  });

  if (!artistData || !summaryData)
    return <Skeleton className="h-60 w-full rounded-sm" />;

  return (
    <div className="bg-foreground/8 overflow-hidden rounded-sm">
      <div className="relative">
        <img
          src={artistData.image_url}
          alt={artistData.name}
          className="h-50 w-full object-cover shadow-inner"
        />
        <div className="pointer-events-none absolute -top-1 h-20 w-full bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute top-3 left-3 mb-2 flex items-center gap-2">
          <h4 className="text-sm font-semibold">About the artist</h4>
          <Badge variant="outline" className="h-4 px-1">
            AI
          </Badge>
        </div>
      </div>

      <div className="p-3">
        <h4 className="mb-2 text-sm font-semibold">{artistData.name}</h4>
        <p className="text-muted-foreground text-xs">
          {summaryData.summary ?? "No summary available."}
        </p>
      </div>
    </div>
  );
}
