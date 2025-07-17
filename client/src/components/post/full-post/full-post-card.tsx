import Card from "@/components/ui/card";
import PlaylistRender from "@/components/playlist/playlist-render";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  Disc,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import GeneralTrackCard from "@/components/post/general-post/general-track-card";
import TrackSuggestionPopover from "@/components/post/track-suggestions/track-suggestion-popover";
import PlaybackToggle from "@/components/track/playback-toggle";
import type { Post } from "shared/types";
import CommentSection from "./comment/comment-section";

export function FullPostCard({ post }: { post: Post }) {
  return (
    <Card className="flex w-full rounded-xs p-0">
      <div className="flex flex-col p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs">
            <img
              src={
                post?.user_image_url || "https://picsum.photos/seed/123/200/300"
              }
              alt="Avatar"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="ml-2">@jerryyy_45</span>
            <span className="text-muted-foreground">&nbsp;• 3d ago</span>
          </div>
          <Ellipsis size={20} className="text-muted-foreground" />
        </div>
        <div className="my-2 flex items-center space-x-2">
          <Badge>Help</Badge>
          <Badge className="text-secondary-foreground bg-white/20">Rnb</Badge>
          <Badge className="text-secondary-foreground bg-white/20">Pop</Badge>
        </div>
        <h1 className="mb-2 text-xl font-semibold">{post?.title}</h1>

        {post?.type === "text" && (
          <p className="text-muted-foreground text-sm">{post?.content}</p>
        )}
        {post?.type === "track_id" && (
          <GeneralTrackCard
            trackId={post.content!}
            className="mt-2 max-w-112"
            affectBackground
          >
            {(trackData) => (
              <PlaybackToggle
                trackData={trackData!}
                size={24}
                className="mr-3"
              />
            )}
          </GeneralTrackCard>
        )}
        {post?.type === "playlist_id" && (
          <PlaylistRender playlistId={post.content!} />
        )}
        <div className="mt-3 flex items-center space-x-4">
          <Heart size={20} />
          <MessageCircle size={20} />
          <Disc size={20} />
          <Bookmark size={20} />
          <Share size={20} />
        </div>
      </div>

      {post?.allow_suggestions && (
        <>
          <Separator />
          <div className="flex flex-col space-y-3 p-3">
            <div className="flex items-center justify-between">
              <h2>Suggestions • {"5"}</h2>
              <TrackSuggestionPopover />
            </div>

            <Card className="rounded-xs">
              {/* <TrackSuggestionsRender postId={post?.id} /> */}
            </Card>
          </div>
        </>
      )}

      <Separator />

      <CommentSection postId={post.id} />
    </Card>
  );
}
