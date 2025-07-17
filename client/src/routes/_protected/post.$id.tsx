import Card from "@/components/ui/card";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createRecentlyViewedMutationOptions,
  postQueryOptions,
} from "@/lib/api-options";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FullPostCard } from "@/components/post/full-post/full-post-card";

export const Route = createFileRoute("/_protected/post/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/post/$id" });
  const { data: post, isLoading } = useQuery(postQueryOptions(id));
  const { mutate } = useMutation(createRecentlyViewedMutationOptions());
  useEffect(() => {
    if (id && post) {
      mutate({
        type: "post",
        content_id: id,
      });
    }
  }, [id, post, mutate]);

  return (
    <div className="flex w-full justify-center p-3">
      <div className="mb-60 flex w-full max-w-2xl">
        {isLoading || !post ? (
          <Skeleton className="rounded-xxs h-150 w-full" />
        ) : (
          <FullPostCard post={post} />
        )}
      </div>

      <div className="sticky top-3 ml-3 hidden w-74 flex-col space-y-3 self-start md:flex">
        <Card className="flex-col space-y-2 rounded-xs md:flex">
          <div className="flex space-x-3">
            <img
              src={
                post?.user_image_url || "https://picsum.photos/seed/123/200/300"
              }
              alt="profile"
              className="h-18 w-18 shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-col justify-center space-y-2">
              <h1 className="text-sm">@jerryyy_45</h1>
              <div className="flex gap-x-3 text-xs">
                <div className="flex flex-col">
                  <span>2</span>
                  <span>posts</span>
                </div>
                <div className="flex flex-col">
                  <span>10</span>
                  <span>followers</span>
                </div>
                <div className="flex flex-col">
                  <span>35</span>
                  <span>rep</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs">Just another listener here...</p>
          <Button className="h-6">Follow</Button>
        </Card>

        <RecentlyViewedCard postId={id} />
      </div>
    </div>
  );
}
