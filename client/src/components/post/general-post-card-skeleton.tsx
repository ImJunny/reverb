import { Skeleton } from "../ui/skeleton";

export default function GeneralPostCardSkeleton() {
  return (
    <div className="bg-card rounded-xs shadow-xl ring-1 ring-black/25">
      <Skeleton className="bg-muted h-50 w-full rounded-xs" />
    </div>
  );
}
