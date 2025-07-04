import Card from "@/components/ui/card";
import BackgroundWrapper from "@/components/page/background-wrapper";
import { createFileRoute, Link } from "@tanstack/react-router";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import {
  Bookmark,
  Disc,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { Badge } from "@/components/ui/badge";
import { useBackground } from "@/lib/hooks/useBackground";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

const posts = [
  {
    id: 3,
    username: "alexjohnson",
    timeAgo: "3hr ago",
    title: "Rate my playlist!",
    playlist_id: "0Ep7iMClqrHS7ax3fpPFVI",
    tags: ["Discussion", "Pop"],
  },
  {
    id: 4,
    username: "robertbrown",
    timeAgo: "5hr ago",
    title: "What is your go-to song for dancing?",
    content:
      "I can't pick between Rock With You by Michael Jackson and Uptown Funk by Mark Ronson. What would yours be?",
    tags: ["Discussion", "General"],
  },
  {
    id: 2,
    username: "janedoe",
    timeAgo: "2hr ago",
    title: "I need some suggestions for my new playlist!",
    playlist_id: "2Z5Oa4vMA7O8zjGOYBwwae",
    tags: ["Help", "Rnb", "Pop"],
  },
  {
    id: 1,
    username: "johnsmith",
    timeAgo: "1hr ago",
    title: "Hello this is a test post!",
    playlist_id: "0Ep7iMClqrHS7ax3fpPFVI",
    tags: ["Discussion", "Test"],
  },
];
function RouteComponent() {
  return (
    <BackgroundWrapper className="p-3" type="gradient">
      <div className="flex w-full max-w-2xl flex-col space-y-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="sticky top-3 ml-3 hidden w-72 flex-col space-y-3 self-start md:flex">
        <RecentlyViewedCard />
      </div>
    </BackgroundWrapper>
  );
}

function PostCard({
  post,
}: {
  post: {
    id: number;
    username: string;
    timeAgo: string;
    title: string;
    content?: string;
    playlist_id?: string;
    tags: string[];
  };
}) {
  const { data: playlistData } = useQuery({
    ...playlistDataQueryOptions(post.playlist_id!),
    enabled: !!post.playlist_id,
  });
  const { data: playlistItems } = useQuery({
    ...playlistItemsQueryOptions(post.playlist_id!),
    enabled: !!post.playlist_id,
  });
  const { setImageUrl } = useBackground();
  useEffect(() => {
    (async () => {
      if (playlistData?.images[0]?.url) {
        const imageUrl = playlistData.images[0].url;
        setImageUrl(imageUrl);
      }
    })();
  }, [playlistData, setImageUrl]);

  const [color, setColor] = useState<string | null>(null);
  const imageUrl = playlistData?.images[0]?.url;
  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const avgColor = await getAverageColor(imageUrl);
        setColor(avgColor);
      }
    })();
  }, [imageUrl]);

  return (
    <Link to={`/post/${post.playlist_id}` as string} className="no-underline">
      <Card className="p-3" transparent>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs">
            <img
              src={`https://www.picsum.photos/200/200?random=${post.id}`}
              alt="Avatar"
              className="h-6 w-6 rounded-full"
            />
            <span className="ml-2">@{post.username}</span>
            <span className="text-muted-foreground">
              &nbsp;• {post.timeAgo}
            </span>
          </div>
          <Ellipsis size={20} className="text-muted-foreground" />
        </div>

        <h1 className="my-2 text-xl font-semibold">{post.title}</h1>
        <div className="mb-3 flex items-center space-x-2">
          <Badge>{post.tags[0]}</Badge>
          {post.tags.slice(1).map((tag, idx) => (
            <Badge key={idx} className="text-secondary-foreground bg-white/20">
              {tag}
            </Badge>
          ))}
        </div>
        {playlistData && playlistItems && (
          <Card
            className="relative flex w-full max-w-150 flex-row space-x-3 p-3"
            style={{
              backgroundColor: color
                ? `color-mix(in srgb, ${color} 95%, white 5%)`
                : undefined,
            }}
          >
            <img
              src={playlistData.images[0]?.url}
              alt={playlistData.name}
              className={cn("h-26 w-26 rounded-sm object-cover shadow-md")}
            />
            <div>
              <h1 className="text-xl font-semibold">{playlistData.name}</h1>
              <div className="text-muted-foreground flex flex-col text-xs">
                <p>{playlistData.tracks.total} songs</p>
              </div>
              <ul className="mt-3">
                {playlistItems?.items.slice(0, 3).map((item) => (
                  <li key={item.track!.id} className="text-xs">
                    <span>{item.track!.name}</span>
                    <span className="text-muted-foreground">
                      &nbsp;• {item.track!.artists[0]!.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
        {post.content && (
          <p className="text-muted-foreground text-sm">{post.content}</p>
        )}
        <div className="mt-3 flex items-center space-x-4">
          <Heart size={20} />
          <MessageCircle size={20} />
          <Disc size={20} />
          <Bookmark size={20} />
          <Share size={20} />
        </div>
      </Card>
    </Link>
  );
}
