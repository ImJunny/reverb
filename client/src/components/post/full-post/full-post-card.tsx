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
  Send,
  Share,
} from "lucide-react";
import GeneralTrackCard from "@/components/post/general-post/general-track-card";
import TrackSuggestionPopover from "@/components/post/track-suggestions/track-suggestion-popover";
import PlaybackToggle from "@/components/track/playback-toggle";
import type { Post } from "shared/types";
import { useMutation } from "@tanstack/react-query";
import { createCommentMutationOptions } from "@/lib/api-options";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function FullPostCard({ post }: { post: Post }) {
  const { mutate: createCommentMutation } = useMutation(
    createCommentMutationOptions(),
  );
  const handleCreateComment = (content: string) => {
    createCommentMutation({
      postId: post.id,
      content,
    });
  };

  return (
    <Card className="flex w-full max-w-2xl rounded-xs p-0">
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
      <div className="flex flex-col space-y-3 p-3">
        <h2>Comments • {"5"}</h2>
        <CommentInput />
      </div>
    </Card>
  );
}

function CommentInput() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="focus-within:ring-ring/50 focus-within:bg-input/50 relative flex flex-col rounded-xs focus-within:ring-[1px]">
      <Textarea
        placeholder="Leave a comment..."
        label="Comment"
        className={cn("peer h-9 resize-none ring-0", focused && "h-20")}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button className="text-primary hidden items-center justify-center self-end peer-focus-within:flex">
        <Send size={20} />
      </button>
    </div>
  );
}
