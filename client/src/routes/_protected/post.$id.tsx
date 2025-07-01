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
import BackgroundWrapper from "@/components/page/background-wrapper";
import { Bookmark, Disc, Heart, MessageCircle, Share } from "lucide-react";

export const Route = createFileRoute("/_protected/post/$id")({
  component: RouteComponent,
});

const recentPosts = [
  {
    id: 1,
    username: "@johnsmith",
    timeAgo: "1hr ago",
    title: "Hello this is a test playlist!",
    likes: 12,
    comments: 5,
    suggestions: 0,
  },
  {
    id: 2,
    username: "@janedoe",
    timeAgo: "2hr ago",
    title: "Another test playlist!",
    likes: 8,
    comments: 2,
    suggestions: 1,
  },
  {
    id: 3,
    username: "@alexdoe",
    timeAgo: "3hr ago",
    title: "Yet another test playlist!",
    likes: 5,
    comments: 1,
    suggestions: 0,
  },
  {
    id: 4,
    username: "@maryjane",
    timeAgo: "4hr ago",
    title: "This is a test playlist!",
    likes: 20,
    comments: 10,
    suggestions: 3,
  },
  {
    id: 5,
    username: "@bobsmith",
    timeAgo: "5hr ago",
    title: "Test playlist example!",
    likes: 15,
    comments: 7,
    suggestions: 2,
  },
];

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
          <div className="my-1 flex items-center space-x-4">
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
            <TracksRender items={playlistItems.items} minimal />
          </Card>
        </div>

        <Separator />
        <div className="flex flex-col space-y-3 p-3">
          <h2>Comments • {"5"}</h2>
        </div>
      </Card>

      <div className="sticky top-3 ml-3 hidden w-72 flex-col space-y-3 self-start md:flex">
        <Card className="w-72 flex-col space-y-2 md:flex" transparent>
          <div className="flex space-x-3">
            <div className="h-18 w-18 shrink-0 rounded-full bg-blue-200" />
            <div className="flex flex-col justify-center space-y-2">
              <h1 className="text-sm">@johnsmith</h1>
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
          <p className="text-xs">Lorem ipsum this is an example bio.</p>
          <Button>Follow</Button>
        </Card>

        <Card transparent className="flex flex-col text-xs">
          <div className="mb-1 flex items-center justify-between">
            <h1>Recently viewed</h1>
            <p className="text-muted-foreground">Clear</p>
          </div>
          <div className="text-foreground/80 flex flex-col space-y-2">
            {recentPosts.map((post, idx) => (
              <>
                <div key={post.id} className="flex flex-col space-y-2 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-200" />
                    <span className="text-foreground">{post.username}</span>
                    <span className="text-muted-foreground">
                      &nbsp;• {post.timeAgo}
                    </span>
                  </div>
                  <p>{post.title}</p>
                  <div className="flex space-x-2">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.suggestions} suggestions</span>
                  </div>
                </div>
                {idx !== recentPosts.length - 1 && <Separator />}
              </>
            ))}
          </div>
        </Card>
      </div>
    </BackgroundWrapper>
  );
}
