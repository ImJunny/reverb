import Card from "@/components/ui/card";
import {
  Bookmark,
  Disc,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getAverageColor } from "@/lib/scripts/getAverageColor";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export default function GeneralPostCard({
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

  const [color, setColor] = useState<string | null>(null);
  const imageUrl = playlistData?.image_url;
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
              src={playlistData.image_url}
              alt={playlistData.name}
              className={cn("h-26 w-26 rounded-sm object-cover shadow-md")}
            />
            <div>
              <h1 className="text-xl font-semibold">{playlistData.name}</h1>
              <div className="text-muted-foreground flex flex-col text-xs">
                <p>{playlistData.total} songs</p>
              </div>
              <ul className="mt-3">
                {playlistItems.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-xs">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">
                      &nbsp;• {item.artists[0]?.name}
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
