import Card from "@/components/ui/card";
import { createFileRoute, useParams } from "@tanstack/react-router";
import PlaylistRender from "@/components/playlist/playlist-render";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TracksRender from "@/components/playlist/tracks-render";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  playlistDataQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
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

export const Route = createFileRoute("/_protected/post/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/post/$id" });
  const { data: playlistData } = useQuery(playlistDataQueryOptions(id));
  const { data: playlistItems } = useQuery(playlistItemsQueryOptions(id));

  if (!playlistData || !playlistItems) return <></>;

  return (
    <BackgroundWrapper type="blur" className="p-3">
      <Card className="flex w-full max-w-2xl p-0" transparent>
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
          <h1 className="my-2 text-xl font-semibold">
            Any song recommendations?
          </h1>
          <div className="mb-3 flex items-center space-x-2">
            <Badge>Help</Badge>
            <Badge className="text-secondary-foreground bg-white/20">Rnb</Badge>
            <Badge className="text-secondary-foreground bg-white/20">Pop</Badge>
          </div>
          <PlaylistRender playlistData={playlistData} items={playlistItems} />
          <div className="mt-3 flex items-center space-x-4">
            <Heart size={20} />
            <MessageCircle size={20} />
            <Disc size={20} />
            <Bookmark size={20} />
            <Share size={20} />
          </div>
        </div>

        <Separator />
        <div className="flex flex-col space-y-3 p-3">
          <h2>Suggestions • {"5"}</h2>
          <Card>
            <TracksRender items={playlistItems} minimal />
          </Card>
        </div>

        <Separator />
        <div className="flex flex-col space-y-3 p-3">
          <h2>Comments • {"5"}</h2>
        </div>
      </Card>

      <div className="sticky top-3 ml-3 hidden w-72 flex-col space-y-3 self-start md:flex">
        <Card className="flex-col space-y-2 md:flex" transparent>
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
          <Button>Follow</Button>
        </Card>

        <RecentlyViewedCard />
      </div>
    </BackgroundWrapper>
  );
}
