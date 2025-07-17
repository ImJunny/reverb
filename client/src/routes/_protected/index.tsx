import { createFileRoute } from "@tanstack/react-router";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import GeneralPostCard from "@/components/post/general-post-card";
import { useQuery } from "@tanstack/react-query";
import { homePostsQueryOptions } from "@/lib/api-options";
import GeneralPostCardSkeleton from "@/components/post/general-post-card-skeleton";
import { useBackgroundChange } from "@/lib/hooks/useBackgroundChange";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts } = useQuery({
    ...homePostsQueryOptions(),
    staleTime: 1000 * 60 * 5,
  });

  useBackgroundChange({
    type: "gradient",
    resetColor: true,
    moving: false,
  });
  return (
    <div className="flex w-full justify-center p-3">
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        {posts
          ? posts?.map((post) => <GeneralPostCard key={post.id} post={post} />)
          : Array.from({ length: 5 }).map((_, idx) => (
              <GeneralPostCardSkeleton key={idx} />
            ))}
      </div>
      <div className="sticky top-3 ml-3 hidden w-74 flex-col space-y-3 self-start md:flex">
        <RecentlyViewedCard />
      </div>
    </div>
  );
}
