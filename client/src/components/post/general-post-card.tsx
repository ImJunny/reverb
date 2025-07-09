import Card from "@/components/ui/card";
import {
  Bookmark,
  Disc,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import type { Post } from "shared/types";
import GeneralPlaylistCard from "./general-post/general-playlist-card";
import GeneralTrackCard from "./general-post/general-track-card";
import { formatTimeAgo } from "@/lib/scripts/formatTimeAgo";

export default function GeneralPostCard({ post }: { post: Post }) {
  return (
    <Link to={`/post/${post.id}` as string} className="no-underline">
      <Card className="hover:bg-card p-3" transparent>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs">
            <img
              src={`https://www.picsum.photos/200/200?random=${post.id}`}
              alt="Avatar"
              className="h-6 w-6 rounded-full"
            />
            <span className="ml-2">@johnsmith</span>
            <span className="text-muted-foreground">
              &nbsp;• {formatTimeAgo(post.created_at!)}
            </span>
          </div>
          <Ellipsis size={20} className="text-muted-foreground" />
        </div>

        <h1 className="my-2 text-lg font-semibold">{post.title}</h1>
        {/* <div className="mb-3 flex items-center space-x-2">
          <Badge>{post.tags[0]}</Badge>
          {post.tags.slice(1).map((tag, idx) => (
            <Badge key={idx} className="text-secondary-foreground bg-white/20">
              {tag}
            </Badge>
          ))}
        </div> */}
        {post.type === "text" && (
          <p className="text-muted-foreground text-sm">{post.content}</p>
        )}
        {post.type === "track_id" && (
          <GeneralTrackCard trackId={post.content!} />
        )}
        {post.type === "playlist_id" && (
          <GeneralPlaylistCard playlistId={post.content!} />
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
