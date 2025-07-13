import { useQuery } from "@tanstack/react-query";
import Card from "../ui/card";
import { Separator } from "../ui/separator";
import { recentlyViewedPostsQueryOptions } from "@/lib/api-options";
import { formatTimeAgo } from "@/lib/scripts/formatTimeAgo";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function RecentlyViewedCard({ postId }: { postId?: string }) {
  const { data } = useQuery({
    ...recentlyViewedPostsQueryOptions(5),
  });
  const [recentPosts, setRecentPosts] = useState(data || []);
  useEffect(() => {
    if (data) {
      const posts = data.filter((post) => post.post_id != postId);
      setRecentPosts(posts);
    }
  }, [data, postId]);

  if (!recentPosts || recentPosts.length === 0) return null;

  return (
    <Card className="flex flex-col overflow-hidden rounded-xs p-0 text-xs shadow-xl ring-1 ring-black/25">
      <div className="bg-card flex px-3 pt-3 pb-1">
        <h1>Recently viewed</h1>
      </div>
      <div className="text-muted-foreground flex flex-col">
        {recentPosts?.map((post, idx) => (
          <Link
            to={`/post/${post.post_id}` as string}
            key={post.id}
            className="hover:bg-card-hover"
          >
            <div className="cursor-pointer px-3">
              <div className="flex flex-col space-y-2 py-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      post.user_image_url ||
                      `https://picsum.photos/200/300?random=${post.id}`
                    }
                    alt="profile"
                    className="h-6 w-6 shrink-0 rounded-full object-cover"
                  />
                  <p className="text-foreground">
                    @johnsmith{" "}
                    <span className="text-muted-foreground">
                      • {formatTimeAgo(post.created_at)}
                    </span>
                  </p>
                </div>
                <p className="line-clamp-2 text-sm">{post.post_title}</p>
                <div className="flex space-x-2">
                  <p>5 likes</p>
                  <p>1 comments</p>
                  <p>3 suggestions</p>
                </div>
              </div>
            </div>
            {idx !== recentPosts.length - 1 && <Separator />}
          </Link>
        ))}
      </div>
    </Card>
  );
}
