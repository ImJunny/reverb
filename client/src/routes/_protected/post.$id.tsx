import Card from "@/components/ui/card";
import { createFileRoute, useParams } from "@tanstack/react-router";
import PlaylistRender from "@/components/playlist/playlist-render";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import TracksRender from "@/components/playlist/tracks-render";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  playlistInfoQueryOptions,
  playlistItemsQueryOptions,
} from "@/lib/api-options";
import BackgroundWrapper from "@/page/background-wrapper";

export const Route = createFileRoute("/_protected/post/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_protected/post/$id" });
  const { data: playlistInfo } = useQuery(playlistInfoQueryOptions(id));
  const { data: playlistItems } = useQuery(playlistItemsQueryOptions(id));

  if (!playlistInfo || !playlistItems) return <></>;

  return (
    <BackgroundWrapper type="blur" className="p-3">
      <Card className="flex w-full max-w-2xl p-0" transparent>
        <div className="flex flex-col space-y-3 p-3">
          <div className="flex items-center text-xs">
            <div className="h-6 w-6 rounded-full bg-blue-200" />
            <span className="ml-2">@johnsmith</span>
            <span className="text-foreground/60">&nbsp;• 1hr ago</span>
          </div>
          <h1 className="text-xl font-semibold">
            Hello this is a test playlist!
          </h1>
          <div className="flex space-x-2">
            <Badge>Help</Badge>
            <Badge className="bg-ring text-foreground">Rap</Badge>
            <Badge className="bg-ring text-foreground">Hip Hop</Badge>
          </div>
          <PlaylistRender
            playlistInfo={playlistInfo}
            items={playlistItems.items}
          />
        </div>

        <Separator />
        <div className="flex flex-col space-y-3 p-3">
          <h2>Suggestions • {"5"}</h2>
          <TracksRender items={playlistItems.items} minimal />
        </div>

        <Separator />
        <div className="flex flex-col space-y-3 p-3">
          <h2>Comments • {"5"}</h2>
        </div>
      </Card>

      <Card
        className="sticky top-3 ml-3 hidden w-72 flex-col space-y-2 self-start md:flex"
        transparent
      >
        <div className="flex space-x-3">
          <div className="h-18 w-18 rounded-full bg-blue-200" />
          <div className="flex flex-col justify-center space-y-2">
            <h1 className="text-sm">@johnsmith</h1>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex flex-col">
                <span>10</span>
                <span>followers</span>
              </div>
              <div className="flex flex-col">
                <span>2</span>
                <span>posts</span>
              </div>
              <div className="flex flex-col">
                <span>35</span>
                <span>rep</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs">Lorem ipsum this is an example bio.</p>
        <Button>Follow</Button>
      </Card>
    </BackgroundWrapper>
  );
}
