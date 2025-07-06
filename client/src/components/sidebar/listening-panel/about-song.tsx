import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { trackSummaryQueryOptions } from "@/lib/api-options";
import { useAudio } from "@/lib/hooks/useAudio";
import { useQuery } from "@tanstack/react-query";

export default function AboutSong() {
  const { trackInfo } = useAudio();

  const { data } = useQuery({
    ...trackSummaryQueryOptions(
      trackInfo?.id,
      trackInfo?.name,
      trackInfo?.artists[0],
    ),
  });

  if (!data) return <Skeleton className="h-40 w-full rounded-sm" />;

  return (
    <div className="bg-foreground/8 overflow-hidden rounded-sm p-3">
      <div className="mb-2 flex items-center gap-2">
        <h4 className="text-sm font-semibold">About the song</h4>
        <Badge variant="outline" className="h-4 px-1">
          AI
        </Badge>
      </div>
      <p className="text-muted-foreground text-xs">
        {data?.summary ?? "No summary available."}
      </p>
    </div>
  );
}
