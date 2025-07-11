import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute } from "@tanstack/react-router";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import GeneralPostCard from "@/components/post/general-post-card";
import { useQuery } from "@tanstack/react-query";
import { homePostsQueryOptions } from "@/lib/api-options";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts } = useQuery({
    ...homePostsQueryOptions(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <BackgroundWrapper
      className="p-3"
      type="gradient"
      options={{ resetColor: true }}
    >
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        {posts?.map((post) => <GeneralPostCard key={post.id} post={post} />)}
      </div>
      <div className="sticky top-3 ml-3 hidden w-72 flex-col space-y-3 self-start md:flex">
        <RecentlyViewedCard />
      </div>
    </BackgroundWrapper>
  );
}
