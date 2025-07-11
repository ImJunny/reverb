import Card from "@/components/ui/card";
import { createFileRoute, useParams } from "@tanstack/react-router";
import PlaylistRender from "@/components/playlist/playlist-render";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { postQueryOptions } from "@/lib/api-options";
import BackgroundWrapper from "@/components/page/background-wrapper";
import {
  Bookmark,
  Disc,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import RecentlyViewedCard from "@/components/page/recenty-viewed-card";
import GeneralTrackCard from "@/components/post/general-post/general-track-card";
import TrackSuggestionPopover from "@/components/post/track-suggestions/track-suggestion-popover";
import PlaybackToggle from "@/components/track/playback-toggle";

export const Route = createFileRoute("/_protected/post/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/post/$id" });
  const { data: post } = useQuery(postQueryOptions(id));

  return (
    <BackgroundWrapper type="blur" className="p-3">
      <Card className="flex w-full max-w-2xl rounded-xs p-0">
        <div className="flex flex-col p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <img
                src="https://picsum.photos/seed/123/200/300"
                alt="Avatar"
                className="h-6 w-6 rounded-full"
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
        </div>
      </Card>

      <div className="sticky top-3 ml-3 hidden w-74 flex-col space-y-3 self-start md:flex">
        <Card className="flex-col space-y-2 rounded-xs md:flex">
          <div className="flex space-x-3">
            <img
              src="https://picsum.photos/seed/123/200/300"
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

        <RecentlyViewedCard />
      </div>
    </BackgroundWrapper>
  );
}
