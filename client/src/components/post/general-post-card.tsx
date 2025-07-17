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
import PlaybackToggle from "../track/playback-toggle";

export default function GeneralPostCard({ post }: { post: Post }) {
  return (
    <Link to={`/post/${post.id}` as string} className="no-underline">
      <Card className="hover:bg-card-hover rounded-xs shadow-xl ring-1 ring-black/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs">
            <img
              src={
                post.user_image_url ||
                `https://www.picsum.photos/200/200?random=${post.id}`
              }
              alt="Avatar"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="ml-2">@johnsmith</span>
            <span className="text-muted-foreground">
              &nbsp;• {formatTimeAgo(post.created_at!)}
            </span>
          </div>
          <Ellipsis size={20} className="text-muted-foreground" />
        </div>

        <h1 className="mt-2 line-clamp-1 text-lg font-semibold">
          {post.title}
        </h1>
        {/* <div className="mb-3 flex items-center space-x-2">
          <Badge>{post.tags[0]}</Badge>
          {post.tags.slice(1).map((tag, idx) => (
            <Badge key={idx} className="text-secondary-foreground bg-white/20">
              {tag}
            </Badge>
          ))}
        </div> */}
        {post.type === "text" && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {post.content}
          </p>
        )}
        {post.type === "track_id" && (
          <GeneralTrackCard trackId={post.content!} className="mt-2 max-w-112">
            {(trackData) => (
              <PlaybackToggle
                trackData={trackData!}
                size={24}
                className="mr-3"
              />
            )}
          </GeneralTrackCard>
        )}
        {post.type === "playlist_id" && (
          <GeneralPlaylistCard
            playlistId={post.content!}
            className="mt-2 max-w-112"
          />
        )}
        <div className="mt-3 flex items-center space-x-4">
          <Heart size={16} />
          <MessageCircle size={16} />
          {post.allow_suggestions && <Disc size={16} />}
          <Bookmark size={16} />
          <Share size={16} />
        </div>
      </Card>
    </Link>
  );
}
